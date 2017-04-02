import time
import subprocess 
import webbrowser
import RPi.GPIO as GPIO
import shutil
from pykeyboard import PyKeyboard
import fileinput
import re

#initialize variables
#############################################################
k= PyKeyboard()
button1 = 27
button2 = 22
switch = 10
displayTimeout=20
pir_sensor = 18
displayOff=0
state=1
timeout=0

#GPIO Setup
#############################################################
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)            
GPIO.setup(button1, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(button2, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(switch, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(pir_sensor, GPIO.IN)



#function definitions
#############################################################
def refreshPage ():
    k.press_key(k.control_key)
    #k.press_key(k.shift_key)
    k.tap_key('R')
    k.release_key(k.control_key)
    #k.release_key(k.shift_key)

def changeState (nextState):
    if nextState == 0:
        #display black
        shutil.copy2('pages/index_black.html', "index.html")
        refreshPage ()
    elif nextState == 1:
        #display dash
        shutil.copy2('pages/index_dash.html', "index.html")
        refreshPage ()
    elif nextState==7:
        #go back to first mood
        for line in fileinput.FileInput("js/dashJS/info.json",inplace=1):
            print (re.sub(":\d",":1",line),end="")
            shutil.copy2('pages/index_mood.html', "index.html")
            refreshPage ()
    else:
        #go to next mood
        nextMood=":"+str(nextState-1)
        for line in fileinput.FileInput("js/dashJS/info.json",inplace=1):
            print (re.sub(":\d",nextMood,line),end="")
            #next mood
            shutil.copy2('pages/index_mood.html', "index.html")
            refreshPage ()


#start device
#############################################################
print("Initializing...")
time.sleep(1)


while True:
    button1_state = GPIO.input(button1)
    button2_state = GPIO.input(button2)
    switch_state = GPIO.input(switch)
    motion = GPIO.input(pir_sensor)
    #check if master switch is on or off
    if switch_state == GPIO.HIGH:
        print("Display OFF")
        timeout=0
        #if display is currently ON then turn OFF
        if state != 0: 
            changeState(0)
            state=0
    else:
        print("Display ON")
        print("motion: %d timeout:%d" %(motion ,timeout))

        #check if motion is detected
        #if no motion is detected for 20s screen will go black
        if motion==0:
            if timeout==displayTimeout:
                #PIR request to disable display 
                displayOff=1
                timeout =0
            else:
                #incerement timeout timer
                timeout=timeout+1
        else:
            timeout=0

        #if button 1 (Dash) is pressed or screen is off and the motion sensor
        #hasnt requested to turn off then turn ON dash
        if (button1_state != GPIO.HIGH or state == 0)and displayOff==0:
            if state != 1:
                state=1
                changeState(state)
                timeout=0
        #if button 2 (mood) is pressed and screen is already not set to mood
        #then go to mood
        elif button2_state != GPIO.HIGH:
            if (state+1)==7:
                state=2
            else: 
                state=state+1
            changeState(state)
            timeout=0
            
        #if display off is requested from PIR and screen is off then disable
        #display
        elif displayOff and (state == 1):
            state = 0
            changeState(0)
            print("******Timeout******")
        #if display off is requested from PIR and screen is off then enable
        #display
        elif motion==1 and state == 0:
            state = 1
            changeState(state)          
            print("******Motion Detected******")
            timeout=0
            displayOff=0
    time.sleep(0.5)

    
GPIO.cleanup()
