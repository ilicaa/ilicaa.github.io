---
title: Mr. Shepherd's Woof
pitch: "Basic Web Game where you play as a shepherd's dog and keep the sheeps in field."
status: Shipped
tracks: [design, production]
tags: [Web-Based Game, GDevelop 5, Game Design]
order: 4

role: Game Designer, Developer, Producer
contributions:
  - Designed and builded the whole game within 2 days.
teamSize: 1
duration: "October 2026"
tools: [GDevelop 5, GDevelop Piskel]

gallery:            
  - src: ../media/shepherds/shepherd-1.png
    alt: "Gameplay"
    caption: "Gameplay"
    section: media
  - src: ../media/shepherds/shepherd-win.png
    alt: "Win State"
    caption: "Win State"
    section: media

thumbnail: { src: ../media/shepherds/shepherd-win.png, alt: "Mr. Shepherd's Woof" }

documents:
  - { file: "../media/shepherds/Mr Shepherd's Woof! — Game Design Document.pdf", label: "Game Design Document" }

links:
  other:
    - { label: "Play on itch.io!", url: "https://ilica.itch.io/mr-shepherds-woof" }
---

## Overview and goals

Mr Shepherd's Woof! is a single-screen herding game built in GDevelop. You play a sheepdog and drive 10 wandering sheep into a pen, but you can never touch them: sheep run straight away from the dog, so where you stand decides where they go.
The central idea is that the pen is not a trap. Sheep inside it keep wandering and can walk back out through the entrance, so the game is won only when all 10 are inside at the same time. The last sheep is the hardest.

Goals for the one-week project:
• Deliver a playable MVP with the full herding loop and a win moment.
• Use only the techniques taught in the three course weeks (platformer, top-down shooter, road racer).
• Keep scope small enough to actually finish.

The long-term vision is larger: more fields, obstacles such as bushes and rocks, a time score and sound. The one-week project covers the core loop.

## My role and contributions

I designed and built the game.

• Chose the herding concept from a shortlist of ideas built on the course mechanics.
• Drew the dog and sheep sprites in Piskel (48×48) and built the meadow, fences and pen in GDevelop.
• Wrote the event logic: dog movement and facing, the bark zone, sheep wandering and fleeing, pen counting, and the win text with the dog's "Woof!".
• Reshaped the design after instructor feedback: removed the wolves and let sheep walk back out of the pen.
• Cover art: a comic-style illustration of the dog chasing two sheep toward a barn, generated with AI.

## Process and planning

The project ran for one week and was built in five stages. Each stage ended with a test run, so a bug could only come from the newest events.

• Stage 1: sprites, scene and dog movement.
• Stage 2: fences, collision walls and the pen layout.
• Stage 3: the bark zone that follows the dog.
• Stage 4: sheep wandering, then fleeing.
• Stage 5: pen counting, the win text and the dog's "Woof!".

Before building, the three course projects were checked for every condition, action and behavior they use, and the design stayed inside that list. Scene changes, sound and saving were not taught, so they are not in the game. A review with the instructor cut the first design, which had wolves, down to herding only.

## Key design decisions

1. **Push away along a line** The first bark zone pushed sheep along the X and Y axes separately, so approaching slightly off-center sent a sheep sideways and the dog kept overlapping it. It was replaced with one force along the line from the dog to the sheep, set stronger than the dog's speed. Now the angle of approach decides where the sheep runs.
2. **1.  A pen that is not a trap** Sheep inside the pen keep wandering and can leave. The count is rebuilt every frame (reset a flag, check the collision, count the sheep), and the win needs all 10 inside at once. This follows the instructor's suggestion and makes the last sheep the hardest.
3. **Small on purpose.** Wolves, a lose state, a start menu, a time score and sound were left out. The herding loop is the idea worth testing, and scene changes were not taught. Sheep walk in 8 fixed directions without rotating, driven by a per-sheep frame counter, which keeps their movement readable and uses only course methods.

## Results

The game is a playable MVP with the full herding loop. It has not been tuned or tested with other players yet.

• Done: dog movement and facing, fence and wall collisions, the bark-zone push, 8-direction wandering for 10 sheep, a live pen count, the win text with the dog's "Woof!", a short game design document and the cover art.
• In progress: playtesting and tuning the dog's speed, the push strength, how often sheep wander and the width of the pen entrance.
• Next: make the collision walls transparent for the final build and prepare the handover.