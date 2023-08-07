// box2d.js tries to access process.stdout/err, need to emulate it

if ("requestAnimationFrame" in globalThis) {
    // // @ts-ignore
    // window.process.stdout = {
    //     write(x: string) {
    //         console.log(x);
    //         return true;
    //     },
    // };

    // // @ts-ignore
    // globalThis.process.stderr = {
    //     write(x: string) {
    //         console.error(x);
    //         return true;
    //     },
    // };
}
