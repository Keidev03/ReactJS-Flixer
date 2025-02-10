import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import styles from './CarouselTranslateX.module.scss';
import { useDragFree } from '../../hooks/useDragFree';
import useDebounce from '../../hooks/useDebounce';
import { EColor } from '../../enums/app/color.enum';
import { ESize } from '../../enums';

const cx = classNames.bind(styles);

export const CarouselTranslateX: React.FC<{
    children: React.ReactNode;
    duration?: number;
    centerMode?: boolean;
    slideToScroll?: number;
    terminalDistance?: string;
    visibleSlides?: number;
}> = ({ children, duration = 0.5, centerMode = false, slideToScroll = undefined, terminalDistance = '0', visibleSlides }) => {
    const viewPortRef = useRef<HTMLDivElement>(null);
    const [viewportWidth, setViewportWidth] = useState<number>(0);
    const [terminalDistanceValue, setTerminalDistanceValue] = useState<number>(0);
    const [slideWidth, setSlideWidth] = useState<number>(0);
    const [slideInActive, setSlideInActive] = useState<number>(0);
    const [totalSlides, setTotalSlides] = useState<number>(0);
    const [scrollIndex, setScrollIndex] = useState<number>(0);
    const [slideOffsets, setSlideOffsets] = useState<number[]>([]);
    const [disableButton, setDisableButton] = useState<{ prev: boolean; next: boolean }>({ prev: false, next: false });

    // Integrated for mobile scrolling mode
    const { handleDragStart, handleDragMove, handleDragEnd } = useDragFree({
        nextSlide: (dragDistance: number) => handleNextScroll(dragDistance),
        prevSlide: (dragDistance: number) => handlePrevScroll(dragDistance),
        sensitivity: 5,
    });

    const handleResize = () => {
        if (viewPortRef.current) setViewportWidth(viewPortRef.current.clientWidth);

        const container = viewPortRef.current?.querySelector(`div`) as HTMLDivElement;

        if (container.children.length > 0) {
            setTotalSlides(container.children.length);

            const firstSlide = container.children[0] as HTMLDivElement;

            const slideWidth = firstSlide.offsetWidth;

            setSlideWidth(slideWidth);

            setSlideInActive(Math.floor(viewportWidth / slideWidth));

            const offsets: number[] = Array.from(container.children).map((child) => (child as HTMLDivElement).offsetLeft);

            setSlideOffsets(offsets);
        }

        if (terminalDistance.endsWith('vw')) {
            const percentage = parseFloat(terminalDistance.replace('vw', ''));
            setTerminalDistanceValue((percentage / 100) * viewportWidth);
        }
        if (terminalDistance.endsWith('%')) {
            const percentage = parseFloat(terminalDistance.replace('%', ''));
            setTerminalDistanceValue((percentage / 100) * viewportWidth);
        }
        if (terminalDistance.endsWith('px')) {
            setTerminalDistanceValue(parseFloat(terminalDistance.replace('px', '')));
        }
    };

    const debouncedWidth = useDebounce(viewportWidth, 500);

    useLayoutEffect(() => {
        handleResize();
        const resizeListener = () => {
            handleResize();
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, [debouncedWidth, children]);

    useEffect(() => {
        const container = viewPortRef.current?.querySelector(`div`) as HTMLDivElement;

        if (container) {
            if (scrollIndex === 0) {
                // First slide case
                container.style.transform = `translate3d(${terminalDistanceValue}px, 0, 0)`;
                setDisableButton({ prev: true, next: false });
            } else if (scrollIndex >= slideOffsets.length - slideInActive) {
                // Last slide case
                container.style.transform = `translate3d(-${slideOffsets[slideOffsets.length - 1] + slideWidth - viewportWidth + terminalDistanceValue}px, 0, 0)`;
                setDisableButton({ prev: false, next: true });
            } else {
                if (centerMode) {
                    // In case the slides are centered and centered
                    setDisableButton({ prev: false, next: false });
                    if (slideInActive % 2 === 0) {
                        const nextSlideOffsetStart = slideOffsets[scrollIndex] || 0;
                        const nextSlideOffsetEnd = slideOffsets[scrollIndex + slideInActive - 1] || 0;
                        const nextSlidesMiddleOffset = (nextSlideOffsetEnd + nextSlideOffsetStart) / 2;
                        const centerSlideViewPortWidth = (viewportWidth - slideWidth) / 2;
                        container.style.transform = `translate3d(-${nextSlidesMiddleOffset - centerSlideViewPortWidth}px, 0, 0)`;
                    } else {
                        const nextSlidesMiddleOffset = slideOffsets[scrollIndex + Math.floor(slideInActive / 2)] || 0;
                        const centerSlideViewPortWidth = (viewportWidth - slideWidth) / 2;
                        container.style.transform = `translate3d(-${nextSlidesMiddleOffset - centerSlideViewPortWidth}px, 0, 0)`;
                    }
                } else {
                    // Case of centered and uncentered slides
                    const nextSlideOffset = slideOffsets[scrollIndex] || 0;
                    container.style.transform = `translate3d(-${nextSlideOffset}px, 0, 0)`;
                }
            }
        }

        // Blur effect for slides outside active area
        for (let i = 0; i < container.children.length; i++) {
            const targetChild = container.children[i] as HTMLElement;
            if (targetChild) {
                if (i < scrollIndex || i >= scrollIndex + slideInActive) {
                    // Blur slides outside the display area
                    targetChild.style.opacity = '0.2';
                    targetChild.style.pointerEvents = 'none';
                    targetChild.classList.remove('hover');
                    targetChild.style.transition = 'opacity 1s ease-in-out';
                } else {
                    // Fade selected slides into the display area
                    targetChild.style.opacity = '1';
                    targetChild.style.transition = 'opacity 1s ease-in-out';
                    targetChild.style.pointerEvents = '';
                }
            }
        }

        container.style.transition = `transform ${duration}s ease-in-out`;

        if (totalSlides <= slideInActive) setDisableButton({ prev: true, next: true });
    }, [scrollIndex, viewportWidth, totalSlides, slideWidth, slideOffsets, slideInActive]);

    const handleNextScroll = (dragDistance?: number) => {
        setScrollIndex((prev) => {
            if (typeof dragDistance === 'number') {
                const number = Math.floor(Math.abs(dragDistance));
                const newIndex = Math.min(slideOffsets.length - slideInActive, prev + number);
                return newIndex;
            }
            const step = slideToScroll || slideInActive;
            const newIndex = Math.min(slideOffsets.length - slideInActive, prev + step);
            return newIndex;
        });
    };

    const handlePrevScroll = (dragDistance?: number) => {
        setScrollIndex((prev) => {
            if (typeof dragDistance === 'number') {
                const number = Math.floor(Math.abs(dragDistance));
                const newIndex = Math.max(0, prev - number);
                return newIndex;
            }
            const step = slideToScroll || slideInActive;
            const newIndex = Math.max(0, prev - step);
            return newIndex;
        });
    };

    return (
        <section style={{ position: 'relative' }} onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd}>
            <div style={{ overflow: 'hidden', scrollSnapType: 'x Mandatory', scrollBehavior: 'smooth' }} ref={viewPortRef}>
                <div style={{ display: 'flex', touchAction: 'pan-y pinch-zoom' }}>
                    {visibleSlides ? React.Children.map(children, (child) => React.cloneElement(child as React.ReactElement, { style: { flex: `1 0 ${100 / visibleSlides}%` } })) : children}
                </div>
            </div>
            <div className={cx('heroCard__controls')}>
                <div className={cx('heroCard__buttons')}>
                    <button padding className={cx('swiperButtonPrev', { unactive: disableButton.prev })} onClick={handlePrevScroll} aria-label="Previous slide">
                        <GrFormPrevious size={ESize.ICON + 10} color={EColor.LIGHT_COLOR} />
                    </button>
                    <button padding className={cx('swiperButtonNext', { unactive: disableButton.next })} onClick={handleNextScroll} aria-label="Next slide">
                        <GrFormNext size={ESize.ICON + 10} color={EColor.LIGHT_COLOR} />
                    </button>
                </div>
            </div>
        </section>
    );
};
