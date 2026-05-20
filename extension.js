({
    name: "CYD Display",
    description: "Drivers for the Cheap Yellow Display (ILI9341)",
    category: "Display",
    v2: true,
    blocks: [
        // 1. Block to Initialize the Display
        {
            xml: `
                <block type="cyd_display_init">
                    <value name="rotation">
                        <shadow type="math_number">
                            <field name="NUM">3</field>
                        </shadow>
                    </value>
                </block>
            `,
            python: (block) => {
                const rotation = Blockly.Python.valueToCode(block, 'rotation', Blockly.Python.ORDER_ATOMIC);
                // This string is what gets injected into the Python editor
                return `from machine import Pin, SPI\n` +
                       `import ili9341\n` +
                       `Pin(21, Pin.OUT).value(1) # Backlight On\n` +
                       `spi_cyd = SPI(2, baudrate=40000000, sck=Pin(14), mosi=Pin(13), miso=Pin(12))\n` +
                       `display = ili9341.ILI9341(spi_cyd, cs=Pin(15), dc=Pin(2), rst=Pin(4), w=320, h=240, r=${rotation})\n`;
            }
        },
        // 2. Block to Print Text
        {
            xml: `
                <block type="cyd_display_print">
                    <value name="text">
                        <shadow type="text">
                            <field name="TEXT">Hello CYD</field>
                        </shadow>
                    </value>
                </block>
            `,
            python: (block) => {
                const text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
                return `display.print(${text})\n`;
            }
        }
    ]
})
