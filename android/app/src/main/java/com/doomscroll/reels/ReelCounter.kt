package com.doomscroll.reels

/**
 * Decides when a new reel came on screen, from the Reels pager's current index.
 * Counts only forward moves: bounced swipes keep the same index and scrolling
 * back up lowers it, so neither counts.
 */
class ReelCounter {
  private var lastIndex: Int? = null

  /** Call when the Reels screen (re)appears; the first index seen is a baseline, not a new reel. */
  fun startSession() {
    lastIndex = null
  }

  /** Returns true when [index] means a new reel came on screen. */
  fun onReelIndex(index: Int): Boolean {
    val last = lastIndex
    lastIndex = index
    return last != null && index > last
  }
}
