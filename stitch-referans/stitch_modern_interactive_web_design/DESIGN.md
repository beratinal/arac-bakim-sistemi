---
name: Zenith Automotive
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#44474a'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#75777a'
  outline-variant: '#c5c7c9'
  surface-tint: '#5d5e60'
  primary: '#5d5e60'
  on-primary: '#ffffff'
  primary-container: '#f5f5f7'
  on-primary-container: '#6e7072'
  inverse-primary: '#c6c6c8'
  secondary: '#5f5e60'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfe1'
  on-secondary-container: '#636264'
  tertiary: '#645d59'
  on-tertiary: '#ffffff'
  tertiary-container: '#fef3ed'
  on-tertiary-container: '#766e6a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e4'
  primary-fixed-dim: '#c6c6c8'
  on-primary-fixed: '#1a1c1d'
  on-primary-fixed-variant: '#454749'
  secondary-fixed: '#e4e2e4'
  secondary-fixed-dim: '#c8c6c8'
  on-secondary-fixed: '#1b1b1d'
  on-secondary-fixed-variant: '#474649'
  tertiary-fixed: '#ebe0db'
  tertiary-fixed-dim: '#cec5bf'
  on-tertiary-fixed: '#1f1b17'
  on-tertiary-fixed-variant: '#4c4641'
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 64px
---

## Brand & Style

This design system is anchored in a sophisticated, minimalist philosophy tailored for a premium scrollytelling experience. The target audience is the discerning vehicle owner who values precision, clarity, and ease of maintenance. The aesthetic prioritizes editorial-grade photography and vast whitespace to create a sense of calm and competence. 

The movement of the interface relies on smooth, momentum-based transitions that mimic the mechanical fluidly of a well-tuned engine. There are no aggressive "gamer" aesthetics or neon glows; instead, the design system employs a refined, corporate-modern approach where information is revealed through layered scrolling, allowing the product photography to remain the primary communicative vehicle.

## Colors

The color palette follows a strict 60-30-10 distribution to ensure visual balance and focus. 

- **60% Neutral Off-white (#F5F5F7):** This serves as the primary canvas, used for backgrounds and large structural containers to maximize whitespace and light.
- **30% Deep Charcoal (#1A1A1C):** Used for primary typography, iconography, and structural anchors like navigation bars or footer elements. It provides the necessary weight and sophistication.
- **10% Soft Electric Blue (#4A90E2):** A measured accent color reserved exclusively for interactive triggers, status indicators (e.g., "Optimal"), and subtle progress markers. It is never used in large washes, only in precise, functional moments.

## Typography

The typography system utilizes **Inter** for its utilitarian clarity and neutral character. To maintain the sophisticated tone, headlines use a lighter weight (300) at large scales to feel editorial, while functional labels use a heavier weight (600) with increased letter spacing for readability.

Line heights are generous to prevent visual clutter and to support the scrollytelling rhythm. Large display text is intended to be paired with high-resolution imagery, often entering the frame via subtle opacity fades or vertical translations during scroll.

## Layout & Spacing

The design system employs a **Fixed Grid** model on desktop (12 columns) and a fluid model on mobile. Content is centered within a maximum width of 1280px to ensure photography remains impactful without becoming distorted.

Spacing is aggressive in its use of "Empty Space." Sections are separated by large vertical margins (80px+) to allow the user to focus on one maintenance aspect at a time. The rhythm is dictated by the scroll; as the user moves down, the "active" card or image should have at least 48px of breathing room from any neighboring text or UI elements.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional drop shadows. 

1. **Base:** The Off-white background is the lowest level.
2. **Containers:** Cards and content modules use a 1px solid stroke in a slightly darker gray (#E5E5E7) or a subtle white fill to lift them off the off-white base.
3. **Overlays:** During scrollytelling transitions, elements may overlap. In these cases, a very soft, high-diffusion shadow (0px 20px 40px rgba(0,0,0,0.04)) is used to signify depth without breaking the minimalist aesthetic.

Interactive elements like buttons should feel "set into" the page rather than floating above it, maintaining a flat but layered architectural feel.

## Shapes

The shape language is defined by the **Soft 12px corner radius**. This specific value (0.75rem) provides a bridge between the clinical precision of automotive engineering and the approachability of a lifestyle app.

- **Primary Containers:** 12px (rounded-lg)
- **Secondary Elements (Buttons/Inputs):** 8px (rounded-md)
- **Small Elements (Chips/Labels):** 4px (rounded-sm)

Images should always carry the 12px radius to maintain a consistent visual rhythm, ensuring no "sharp" edges disrupt the smooth scrollytelling flow.

## Components

- **Buttons:** Primary buttons are solid Deep Charcoal with white text. Secondary buttons are outlined (1px Deep Charcoal). Interactions should trigger a subtle shift in the Soft Electric Blue for the border or text.
- **Maintenance Chips:** Small status indicators (e.g., "Due Soon," "Healthy"). They use a 4px radius and a light tint of the status color (e.g., light blue background with dark blue text) to remain unobtrusive.
- **Cards:** Used for maintenance tasks. These are white with a 12px radius and a 1px neutral stroke. They should animate into view using a "slide-and-fade" effect.
- **Scrollytelling Progress Bar:** A thin, 2px horizontal line at the top of the viewport in Soft Electric Blue, indicating how far the user has progressed through the vehicle health report.
- **Photography Placeholders:** Images should occupy 50% or 100% of the grid width, always featuring a subtle desaturated treatment to align with the Charcoal/Off-white palette, allowing the Electric Blue UI elements to pop.
- **Input Fields:** Minimalist lines rather than boxes. A 1px bottom border in Deep Charcoal that turns into Soft Electric Blue on focus.