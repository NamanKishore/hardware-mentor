export const projects = {
    'dasai-mochi': {
        title: "Dasai Mochi Robot",
        steps: [
            {
                id: 1,
                title: "Identify Components",
                description: "Lay out all parts: PCB, 2 Motors, Battery Holder, Switch, ESP32.",
                image: "https://placehold.co/600x400/24283b/c0caf5?text=Components+Layout",
                type: "info"
            },
            {
                id: 2,
                title: "Solder Motor Driver",
                description: "Place the L298N motor driver on the PCB footprint labeled 'U1'. Ensure orientation matches the silk screen.",
                image: "https://placehold.co/600x400/24283b/c0caf5?text=Motor+Driver+Placement",
                diagram: "https://placehold.co/600x400/1a1b26/7aa2f7?text=Solder+Diagram",
                type: "solder"
            },
            {
                id: 3,
                title: "Attach Battery Holder",
                description: "Solder the battery holder red wire to (+) and black wire to (-).",
                image: "https://placehold.co/600x400/24283b/c0caf5?text=Battery+Holder",
                type: "solder"
            },
            {
                id: 4,
                title: "Final Assembly",
                description: "Snap the ESP32 into the headers.",
                image: "https://placehold.co/600x400/24283b/c0caf5?text=Final+Assembly",
                type: "info"
            }
        ]
    },
    'tiny-wheeled': {
        title: "Tiny Wheeled Robot",
        steps: [
            {
                id: 1,
                title: "Chassis Prep",
                description: "Sand the edges of the 3D printed chassis.",
                image: "https://placehold.co/600x400/24283b/c0caf5?text=Chassis",
                type: "info"
            }
        ]
    }
};
