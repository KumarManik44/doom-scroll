package com.doomscroll.reels

import java.util.Calendar
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ReelCounterTest {
  private fun countAll(counter: ReelCounter, indexes: List<Int>) = indexes.count { counter.onReelIndex(it) }

  @Test
  fun firstIndexOfSessionIsBaseline() {
    val counter = ReelCounter()
    assertFalse(counter.onReelIndex(12))
  }

  @Test
  fun forwardSwipesCountOnce() {
    // Repeated events per swipe, like Instagram emits.
    assertEquals(3, countAll(ReelCounter(), listOf(0, 0, 1, 1, 1, 2, 3, 3)))
  }

  @Test
  fun bouncedSwipesDoNotCount() {
    assertEquals(0, countAll(ReelCounter(), listOf(12, 12, 12, 12)))
  }

  @Test
  fun scrollingBackDoesNotCount() {
    assertEquals(1, countAll(ReelCounter(), listOf(5, 4, 3, 4)))
  }

  @Test
  fun newSessionResetsBaseline() {
    val counter = ReelCounter()
    countAll(counter, listOf(0, 1, 2))
    counter.startSession()
    assertFalse(counter.onReelIndex(7))
    assertTrue(counter.onReelIndex(8))
  }

  @Test
  fun dayKeyChangesAtMidnight() {
    val cal = Calendar.getInstance().apply { set(2026, Calendar.OCTOBER, 21, 23, 59, 59) }
    assertEquals("2026-10-21", DailyCounts.keyFor(cal.time))
    cal.add(Calendar.SECOND, 1)
    assertEquals("2026-10-22", DailyCounts.keyFor(cal.time))
  }
}
