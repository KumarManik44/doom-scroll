package com.doomscroll.reels

import android.content.Context
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/** Reel counts per local calendar day, so a new day starts at 0 automatically. */
class DailyCounts(context: Context) {
  private val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

  fun today(): Int = countFor(Date())

  fun countFor(date: Date): Int = prefs.getInt(keyFor(date), 0)

  fun increment(): Int {
    val key = keyFor(Date())
    val count = prefs.getInt(key, 0) + 1
    prefs.edit().putInt(key, count).apply()
    return count
  }

  companion object {
    const val PREFS_NAME = "reel_counts"

    fun keyFor(date: Date): String = SimpleDateFormat("yyyy-MM-dd", Locale.US).format(date)
  }
}
