## StaySharp, AcuteYou, Mindex, 
A learning app for staying sharp on your interests. Let's the user create quizzes from any source, whether it be a youtube video, a website, wikipedia, picture, or just simple text. With using techniques like spaced repition it will keep knowledge in check to make sure you don't forget. [[StaySharp]]

## QuickTalk
A bare bones app that helps you make witty comebacks / respond in conversations. You are given x amount of dialogues to respond to daily and you need to respond to at least one per day to keep your streak going. The UI is very minimal. All on one page. $5/month or one time $50 payment. 

<img src="/img/fracture.png">

## TwitterAnalysis
Analyzes your tweet history and can give you insights as to what you are posting right or wrong. Scrapes a users tweet history and generates a report and then emails them. Get a one time report for $20, or $5/mo for a monthly report sent directly to your inbox.
- tweetitright.com
- onlygoodtweets.com
- tweetinsightful.com
- TweetMetricsPro.com
- AnalyzeMyTweets.com
- InsightTweet.com
## Mobile AI chat idle game
You create your own character and let them interact with unlockable, progressable objects in a 3d space. Unlockable objects like a cell phone let it text you more often. May want to keep boredom / happiness levels for more stategy, or none if target audience wants simplicity 
## Meme review
There are a lot of places to find memes, now lets download them to once place and have them displayed in a row to review the ones that are suitable for posting.
Use 4chan (wsg), Instagram (if scraping possible)
## Blue Ball Incentive System (BBIS)
Giving in to desires is very easy. It's so easy to get distracted with Youtube, or Insta, or anything else that is easy to give your attention to. This system aims to reduce distractions with restrictions and encourage longer productivity through miniscule rewards.  
## XRoleplay
A XR / VR based simulation environment for roleplaying with AI characters powered by unity.
## Gaussian-Splat Mobile App
Save 3d memories with a video. 5-30 sec video is uploaded to a server with a gpu with 24gb+ VRAM. 
## Human Reinforcement Learning
A framework for ensuring learning is being done in an efficient manner.
    1. Curriculum picked
    2. Assessment made on current knowledge
    3. Schedule is made for studying
    4. Reminders for studying
## Simulate.me 
A fun theraputic program that takes a highly detailed personality into account (using  [[AI.Me]] person template) and runs scenarios against it in a game-like ui. Or could be in a video format with text on the screen and a narrator reading parts and potentially incorporating the user's voice, but we may already be asking for too much informaton.

**Strategy**:
*Paint a stunning picture of the user's success while also acknowledging their deepest fears and struggles*

- Uses pixelart or visul novel type interface
- Simulate worst case scenarios
- Simulate success (generate inspiration)
Could be used in conjunction with the [[Defining Fears Framework]] to help people understand their anxiety.


## Skill Engine
Pretty much a skill coach that teaches and reinforces your general skills through notifications. 

The problem is that I want to learn lots of things, like the Jurassic Era, or the cultural revolution, but I don't have the energy to stay persistent learning then. But this energy problem, how do I fix that? 

## MyStory
Rides on the realization that life is about how you want to tell your story. Turns your ideal life story into actionable, feasible segmented steps.

## Balanced.life
Helps you figure out your priorities and displays them in something called a wheel of life. This wheel contains different areas of your life that can be allocated a limited amount of points. Optional feature would help you visualize what you would be giving up, or what improvements you might make based on changes. Or input current struggles and the circle would adjust and give you a plan.
![[Pasted image 20231204135640.png]]

## Karen
*Your personal, digital maiden that watches everything you do, see, and hear*

**Problem**: 
I don't like being personally accountible. I make bad decisions like eating a bunch of takis, or watching tv or scrolling for hours, and eat bad. Now I am aware that I am doing that but I make excuses or justify myself with no one to tell me no... or at least yell at me. 

**How it works**: 
You put on a pendant that has a wide angle camera, mic, and a bluetooth or wifi module.

Once connected to the device via smartphone you will navigate to a local server. From here you will be able change settings and monitor it's processes.

Once it is turned on it will begin capturing data.
- Audio: continuos
- Image: 1/minute

The data is sent to the mobile phone and saved locally where then it is sent to a remote server for processing.

But before it is sent to a server we need to define our personal goals.
- Eat only whole foods
- Stay off of social media
- Read a book
- Don't stay on the computer too long at home
- No youtube

Now we have to give the model instruction on how to get angry at us.
```python
import random
user = "Clayton"
character = "Karen"
goals = ["Eat only whole foods", "Stay off of social media", "Read a book", "Don't stay on the computer too long at home", "No youtube (educational is ok)"]
goalList = "".join([f"- {g} \n".format(g) for g in goals])
positiveOrNegative = random.choice(["positive", "negative"])

message = f"""
You are a virtual assitant named {character}.

You task is to make sure {user} does not violate any of his goals listed below:

Goals:
'''
{goalList}
'''

If {user} is found to have violated any of their goals or may appear to be, respond the following way:
- Angry
- Like a mother would
- Disappointed
- How pathetic {user} is
- {user} is weak

If no violations just make a minor {positiveOrNegative} remark on what they're currently doing.
"""

print(message)

```

Now that we've built the message we will now transcribe the audio using Whisper and then send the request to the server
```
Request = {
 "url": "https://freegpuhosting.com"
 "messages": ["Your task is to..."],
 "transcript": transcribe("/karen/ears/2023/12/5/1128.wav"), 
 "image": open("/karen/eyes/2023/12/5/1128.png"),
}
```

The audio will be saved in minute intervals.

So before we send it to the server let's see how much it would cost for the image processing
```python
snapshot_interval_min = 1
avg_hours_active = 8

in_cost = .01 / 1000
out_cost = .03 / 1000

in_tokens = 131
out_tokens = 150

in_charge = in_tokens * in_cost
out_charge = out_tokens * out_cost
img_charge = .00255

total = in_charge + out_charge + .00255
daily_total = avg_hours_active * 60 * total

print("One charge:", total)
print("Daily charge:", daily_total)
print("Monthly:", daily_total * 30)
```


## day2day
Helps keep long term focus.

## BrainJams
A music database that keeps categorizes music with emotions

## S2-Weaver
(S2 from s2 engine in NGE)
A physical device that is worn over the hand like a glove and can run commands given 