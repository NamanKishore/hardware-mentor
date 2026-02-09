export const playBase64Audio = (base64String) => {
    if (!base64String) return;

    // Clean up prefix if present (though usually we just send the raw base64 data)
    const cleanBase64 = base64String.replace(/^data:audio\/\w+;base64,/, "");

    try {
        const audio = new Audio(`data:audio/wav;base64,${cleanBase64}`);
        audio.play().catch(e => console.error("Audio playback failed:", e));
    } catch (error) {
        console.error("Error creating audio object:", error);
    }
};
