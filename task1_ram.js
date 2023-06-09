(() => {
    const DURATION = 300;
    const ramContainer = document.querySelector('.ram-container');

    const children = ramContainer.querySelectorAll('.child');
    const animateElements = Array.from(children).map(ch => ch.querySelector('.child-bottom-border'));

    let animationId = 0;

    const incWidth = (passedTime, duration) => Math.round(passedTime / duration * 100);
    const decWidth = (passedTime, duration) => Math.round((1 - passedTime / duration) * 100);

    const createAnimationStep = (element, duration, wFn) => {
        if (!element) {
            throw new Error('No element to animate');
        }

        if (!duration) {
            throw new Error('No animation duration provided');
        }

        let start = 0;

        const step = (ts) => {
            if (!start) {
                start = ts;
            }

            const passedTime = ts - start;
            if (passedTime >= duration) {
                return;
            }

            const w = wFn(passedTime, duration);
            element.style.width = `${w}%`;

            animationId = requestAnimationFrame(step);
        };

        return step;
    };

    children.forEach((ch, idx) => {
        ch.addEventListener('mouseenter', () => {
            cancelAnimationFrame(animationId);
            const incStepFn = createAnimationStep(animateElements[idx], DURATION, incWidth);
            animationId = requestAnimationFrame(incStepFn);
        });
        ch.addEventListener('mouseleave', () => {
            cancelAnimationFrame(animationId);
            const decStepFn = createAnimationStep(animateElements[idx], DURATION, decWidth);
            animationId = requestAnimationFrame(decStepFn);
        });
    });
})();