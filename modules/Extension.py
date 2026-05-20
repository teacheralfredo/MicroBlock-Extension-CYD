from machine import Pin, SPI
import ili9341 # Ensure this driver is uploaded to your board

# 1. Setup the Backlight (Crucial for CYD!)
# The display will stay black unless GPIO 21 is High
backlight = Pin(21, Pin.OUT)
backlight.value(1)

# 2. Configure SPI for the ILI9341 Display
# CYD Pins: SCK=14, MOSI=13, MISO=12 (Standard HSPI)
spi = SPI(2, baudrate=40000000, sck=Pin(14), mosi=Pin(13), miso=Pin(12))

# 3. Initialize Display Driver
# Pins: CS=15, DC=2, RST=4 (Some versions use 12 for RST, but 4 is standard)
display = ili9341.ILI9341(
    spi,
    cs=Pin(15),
    dc=Pin(2),
    rst=Pin(4),
    w=320,
    h=240,
    r=3 # Rotation: 1 or 3 for Landscape
)

# 4. Test Drawing
display.erase()
display.set_pos(0, 0)
display.print("CYD microBlock Test")
display.rect(10, 30, 100, 50, ili9341.color565(255, 255, 0)) # Yellow box

print("Initialization Complete!")