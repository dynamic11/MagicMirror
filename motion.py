import RPi.GPIO as GPIO
import time
import subprocess 
import webbrowser


pir_sensor = 18
#piezo = 7

GPIO.setmode(GPIO.BOARD)
#GPIO.setup(piezo, GPIO.OUT)


#GPIO.setup(piezo, GPIO.OUT)
GPIO.setup(pir_sensor, GPIO.IN)
current_state = 1
check0 = 0
check1 = 0

pstatus = 0
try:        
               
        while True:
                
                time.sleep(0.5)
                current_state = GPIO.input(pir_sensor)
                print("GPIO pin %s is %s" % (pir_sensor, current_state))

                #if  current_state == 0:
                        
                        

                if current_state == 0:
                        check0 = check0 + 1
                else:
                        check = 0
                if check0 == 30:
                        check0 = 0
                        print("GPIO pin %s is %s" % (pir_sensor, current_state))

                        #Code to open up black screen here 
                        #p.kill()
                        #p1 = webbrowser.open_new("https://www.howtogeek.com/wp-content/uploads/2012/12/Plain-Black-Wallpaper.png")
                        print("black")
                        pstatus = 1
                        while current_state == 0:
                                current_state = GPIO.input(pir_sensor)
                                if current_state == 1:
                                        break        
                        #GPIO.output(piezo, GPIO.HIGH)
                        time.sleep(3)
                        #GPIO.output(piezo, False)
                        time.sleep(2)
                if current_state == 1:
                        check1 = check1 + 1
                if check1 == 4:
                        if pstatus != 0:
                                #code to close the black screen here 
                                #p1.terminate()
                                #p = subprocess.Popen(["firefox", "localhost:8000"])
                                print("Dash")
                                pstatus = 0
                        check1 = 0
                        
                
except KeyboardInterrupt:
        pass
finally:
        GPIO.cleanup()
        

        
