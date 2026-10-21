package com.doomscroll.reels

import android.content.Context
import android.graphics.PixelFormat
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.util.TypedValue
import android.view.Gravity
import android.view.WindowManager
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import com.doomscroll.R

/** The light pill with the Doom face and today's count, drawn over Instagram (see DESIGN.md "Overlay pill"). */
class ReelOverlay(private val context: Context) {
  private val windowManager = context.getSystemService(WindowManager::class.java)
  private var pill: LinearLayout? = null
  private var countText: TextView? = null

  fun show(count: Int) {
    if (pill == null) {
      val view = buildPill()
      windowManager.addView(view, layoutParams())
      pill = view
    }
    update(count)
  }

  fun update(count: Int) {
    countText?.text = count.toString()
    pill?.contentDescription = "Reels scrolled today: $count"
  }

  fun hide() {
    pill?.let { windowManager.removeView(it) }
    pill = null
    countText = null
  }

  private fun buildPill(): LinearLayout {
    val face = ImageView(context).apply {
      setImageResource(R.drawable.doom_face)
      layoutParams = LinearLayout.LayoutParams(dp(ICON_SIZE_DP), dp(ICON_SIZE_DP))
    }
    val text = TextView(context).apply {
      setTextColor(context.getColor(R.color.overlay_text))
      setTextSize(TypedValue.COMPLEX_UNIT_SP, TEXT_SIZE_SP)
      typeface = Typeface.DEFAULT_BOLD
      layoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.WRAP_CONTENT,
        LinearLayout.LayoutParams.WRAP_CONTENT,
      ).apply { marginStart = dp(SPACING_SM_DP) }
    }
    countText = text
    return LinearLayout(context).apply {
      orientation = LinearLayout.HORIZONTAL
      gravity = Gravity.CENTER_VERTICAL
      setPadding(dp(2), 0, dp(SPACING_MD_DP), 0)
      background = GradientDrawable().apply {
        setColor(context.getColor(R.color.overlay_bg))
        setStroke(dp(1), context.getColor(R.color.overlay_border))
        cornerRadius = dp(PILL_HEIGHT_DP).toFloat()
      }
      addView(face)
      addView(text)
    }
  }

  private fun layoutParams() = WindowManager.LayoutParams(
    WindowManager.LayoutParams.WRAP_CONTENT,
    dp(PILL_HEIGHT_DP),
    WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY,
    WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
      WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE or
      WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
    PixelFormat.TRANSLUCENT,
  ).apply {
    gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
    y = dp(TOP_OFFSET_DP)
  }

  private fun dp(value: Int): Int =
    (value * context.resources.displayMetrics.density).toInt()

  companion object {
    // Mirrors DESIGN.md tokens (components.overlay-pill, spacing).
    private const val PILL_HEIGHT_DP = 40
    private const val ICON_SIZE_DP = 36
    private const val TEXT_SIZE_SP = 17f
    private const val SPACING_SM_DP = 8
    private const val SPACING_MD_DP = 16
    // Below the status bar and Instagram's "Reels" header.
    private const val TOP_OFFSET_DP = 96
  }
}
