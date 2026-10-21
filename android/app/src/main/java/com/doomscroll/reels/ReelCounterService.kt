package com.doomscroll.reels

import android.accessibilityservice.AccessibilityService
import android.os.Handler
import android.os.Looper
import android.view.accessibility.AccessibilityEvent

/**
 * Counts Instagram Reels and shows the Doom overlay while Reels is on screen.
 * Instagram's Reels screen is a ViewPager with id [REELS_PAGER_ID]; its scroll
 * events carry the current reel index in fromIndex.
 */
class ReelCounterService : AccessibilityService() {
  private val handler = Handler(Looper.getMainLooper())
  private val counter = ReelCounter()
  private lateinit var counts: DailyCounts
  private lateinit var overlay: ReelOverlay
  private var inReels = false
  private var checkScheduled = false

  override fun onServiceConnected() {
    counts = DailyCounts(this)
    overlay = ReelOverlay(this)
    isRunning = true
  }

  override fun onAccessibilityEvent(event: AccessibilityEvent) {
    val isInstagram = event.packageName == INSTAGRAM
    if (isInstagram && event.eventType == AccessibilityEvent.TYPE_VIEW_SCROLLED) {
      if (event.source?.viewIdResourceName == REELS_PAGER_ID) onReelsScrolled(event.fromIndex)
      return
    }
    // Screen changes (inside Instagram or to another app): re-check whether Reels is visible.
    if (isInstagram || event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) scheduleReelsCheck()
  }

  private fun onReelsScrolled(index: Int) {
    enterReels()
    if (counter.onReelIndex(index)) overlay.update(counts.increment())
  }

  /** Throttled: content-change events fire constantly while a reel plays. */
  private fun scheduleReelsCheck() {
    if (checkScheduled) return
    checkScheduled = true
    handler.postDelayed({
      checkScheduled = false
      if (isReelsVisible()) enterReels() else leaveReels()
    }, CHECK_DELAY_MS)
  }

  private fun isReelsVisible(): Boolean {
    val root = rootInActiveWindow ?: return false
    if (root.packageName != INSTAGRAM) return false
    return root.findAccessibilityNodeInfosByViewId(REELS_PAGER_ID).any { it.isVisibleToUser }
  }

  private fun enterReels() {
    if (inReels) return
    inReels = true
    counter.startSession()
    overlay.show(counts.today())
  }

  private fun leaveReels() {
    if (!inReels) return
    inReels = false
    overlay.hide()
  }

  override fun onInterrupt() = Unit

  override fun onDestroy() {
    isRunning = false
    handler.removeCallbacksAndMessages(null)
    if (::overlay.isInitialized) overlay.hide()
    super.onDestroy()
  }

  companion object {
    /** Read by ReelStatsModule; the service runs in the app's process. */
    @Volatile
    var isRunning = false
      private set

    const val INSTAGRAM = "com.instagram.android"
    const val REELS_PAGER_ID = "com.instagram.android:id/clips_viewer_view_pager"
    private const val CHECK_DELAY_MS = 300L
  }
}
