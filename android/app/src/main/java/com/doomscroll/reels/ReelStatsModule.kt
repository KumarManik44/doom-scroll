package com.doomscroll.reels

import android.content.Intent
import android.net.Uri
import android.provider.Settings
import com.doomscroll.specs.NativeReelStatsSpec
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import java.util.Calendar

/** Exposes daily reel counts and counter status to JS (spec: src/specs/NativeReelStats.ts). */
class ReelStatsModule(reactContext: ReactApplicationContext) : NativeReelStatsSpec(reactContext) {

  override fun getName() = NAME

  override fun getRecentCounts(days: Double, promise: Promise) {
    val counts = DailyCounts(reactApplicationContext)
    val result = Arguments.createArray()
    val day = Calendar.getInstance()
    repeat(days.toInt()) {
      result.pushMap(
        Arguments.createMap().apply {
          putString("date", DailyCounts.keyFor(day.time))
          putInt("count", counts.countFor(day.time))
        },
      )
      day.add(Calendar.DAY_OF_YEAR, -1)
    }
    promise.resolve(result)
  }

  override fun isCounterRunning() = ReelCounterService.isRunning

  override fun openAccessibilitySettings() {
    startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
  }

  override fun openAppSettings() {
    startActivity(
      Intent(
        Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
        Uri.fromParts("package", reactApplicationContext.packageName, null),
      ),
    )
  }

  private fun startActivity(intent: Intent) {
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    reactApplicationContext.startActivity(intent)
  }

  companion object {
    const val NAME = "ReelStats"
  }
}
