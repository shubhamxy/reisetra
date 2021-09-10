import * as React from 'react'

/**
 *
 * Work in progress
 */
/**
 // Part of code taken from w3 schools for lens movement
 Need to maintain the ratio between lens and main image

 Need to maintain the ratio between preview container div and image used for preview

 Need to have imagePreview width and height with the same aspect ratio
 as the original image

 Need to translate in horizontal by the ratio of imagePreview width / img width
 Same translate in vertical by the ration of imagePreview height / img height
 **/
// import "./styles.css";

interface IStringKeyObj {
    [key: string]: any
}

interface IDefaultImgPreview {
    moveLens: React.MouseEventHandler<any>
    imgContainerDimesions: IStringKeyObj
    lensDimensions: IStringKeyObj
    imgDimesions: IStringKeyObj
    previewLensDimensions: IStringKeyObj
    previewImgDimensions: IStringKeyObj
    img?: string
    previewImg?: string
    imgRefCallback: React.Ref<HTMLImageElement>
    meshRefCallback: React.Ref<any>
    imagePreviewRefCallback: React.Ref<any>
}

const DefaultImgPreview = ({
    moveLens,
    imgContainerDimesions,
    lensDimensions,
    imgDimesions,
    previewLensDimensions,
    previewImgDimensions,
    img,
    previewImg,
    imgRefCallback,
    meshRefCallback,
    imagePreviewRefCallback,
}: IDefaultImgPreview) => {
    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <div
                className="img-main-container"
                onMouseMove={moveLens}
                style={{
                    ...imgContainerDimesions,
                }}
            >
                <div
                    ref={meshRefCallback}
                    className="mesh"
                    style={{
                        opacity: 0.2,
                        position: 'absolute',
                        backgroundImage: `url("data:image/jpeg;base64,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")`,
                        backgroundPosition: '50% center',
                        backgroundSize: '2px 2px',
                        height: '100px',
                        width: '100px',
                        ...lensDimensions,
                    }}
                />
                <img
                    style={{
                        ...imgDimesions,
                    }}
                    ref={imgRefCallback}
                    alt="test"
                    src={img}
                />
            </div>
            <div
                className="img-preview-section-container"
                // ref={imagePreviewRefContainer}
                style={{
                    position: 'absolute',
                    left: '106%',
                    top: 0,
                    ...previewLensDimensions,
                }}
            >
                <img
                    ref={imagePreviewRefCallback}
                    alt="test-preview"
                    src={previewImg}
                    style={{
                        ...previewImgDimensions,
                    }}
                    className="img-preview-section"
                />
            </div>
        </div>
    )
}

interface IOptions {
    imgHeight: number
    imgWidth: number
    lensHeight: number
    lensWidth: number
    previewLensHeight: number
    img?: string
    previewImg?: string
}

/**
 * useImageZoom hook for zoom of images
 */

function useImageZoom({
    imgHeight,
    imgWidth,
    lensHeight,
    lensWidth,
    previewLensHeight,
    img,
    previewImg,
}: IOptions) {
    const [imgElemInState, setimgElemInState] =
        React.useState<HTMLImageElement | null>(null)
    const [meshElemInState, setmeshElemInState] =
        React.useState<HTMLElement | null>(null)

    const [imagePreviewELemInState, setimagePreviewELemInState] =
        React.useState<HTMLElement | null>(null)

    const calculateDimensions = React.useCallback(() => {
        const imgToLensRatioHeight = imgHeight / lensHeight
        const imgToLensRatioWidth = imgWidth / lensWidth
        const lensDimensionRatio = lensWidth / lensHeight
        const previewLensWidth = lensDimensionRatio * previewLensHeight
        const imgPreviewHeight = imgToLensRatioHeight * previewLensHeight
        const imgPreviewWidth = imgToLensRatioWidth * previewLensWidth

        return {
            imgHeight,
            imgWidth,
            lensHeight,
            lensWidth,
            previewLensHeight,
            imgPreviewHeight,
            imgPreviewWidth,
            previewLensWidth,
        }
    }, [imgHeight, imgWidth, lensHeight, lensWidth, previewLensHeight])

    const [zoomDimensions, setZoomDimensions] = React.useState(() => {
        return calculateDimensions()
    })

    React.useEffect(() => {
        const newZoomDimensions = calculateDimensions()
        setZoomDimensions(newZoomDimensions)
    }, [
        imgHeight,
        lensHeight,
        imgWidth,
        lensWidth,
        previewLensHeight,
        calculateDimensions,
    ])
    const getCursorPos = React.useCallback(
        (e) => {
            let a
            let x = 0
            let y = 0
            const img = imgElemInState
            if (img) {
                e = e || window.event
                /* Get the x and y positions of the image: */
                a = img.getBoundingClientRect()
                /* Calculate the cursor's x and y coordinates, relative to the image: */
                x = e.pageX - a.left
                y = e.pageY - a.top
                /* Consider any page scrolling: */
                x = x - window.pageXOffset
                y = y - window.pageYOffset
            }
            return { x: x, y: y }
        },
        [imgElemInState]
    )
    const moveLens: React.MouseEventHandler<any> = React.useCallback(
        (e) => {
            let pos, x, y
            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault()
            /* Get the cursor's x and y positions: */
            const lens = meshElemInState
            const img = imgElemInState
            const imgPreview = imagePreviewELemInState
            if (!img || !imgPreview || !lens) return

            const cx = imgPreview.offsetWidth / img.offsetWidth
            const cy = imgPreview.offsetHeight / img.offsetHeight
            pos = getCursorPos(e)
            /* Calculate the position of the lens: */
            x = pos.x - lens.offsetWidth / 2
            y = pos.y - lens.offsetHeight / 2
            /* Prevent the lens from being positioned outside the image: */
            if (x > img.width - lens.offsetWidth) {
                x = img.width - lens.offsetWidth
            }
            if (x < 0) {
                x = 0
            }
            if (y > img.height - lens.offsetHeight) {
                y = img.height - lens.offsetHeight
            }
            if (y < 0) {
                y = 0
            }
            /* Set the position of the lens: */
            lens.style.left = x + 'px'
            lens.style.top = y + 'px'
            /* Display what the lens "sees": */
            const finaltranslateX = x * cx
            const finaltranslateY = y * cy

            imgPreview.style.transform = `translate3d(${-finaltranslateX}px, ${-finaltranslateY}px, 0px)`
        },
        [meshElemInState, imgElemInState, imagePreviewELemInState, getCursorPos]
    )
    /**
     * Need to segregate the state value for better usage of this library
     * imgDimesion
     * lensDimension,
     * previewLensDimension
     * previewImgDimension
     */
    const imgRefCallback = React.useCallback((node) => {
        setimgElemInState(node)
    }, [])

    const meshRefCallback = React.useCallback((node) => {
        setmeshElemInState(node)
    }, [])

    const imagePreviewRefCallback = React.useCallback((node) => {
        setimagePreviewELemInState(node)
    }, [])

    const {
        imgHeight: imgHeightInState,
        imgWidth: imgWidthInState,
        lensHeight: lensHeightInState,
        lensWidth: lensWidthInState,
        previewLensHeight: previewLensHeightInState,
        previewLensWidth: previewLensWidthInState,
        imgPreviewHeight: imgPreviewHeightInState,
        imgPreviewWidth: imgPreviewWidthInState,
    } = zoomDimensions

    /**
     * Segregating the style props for various zoom Ui elements
     */

    const imgContainerDimesions = {
        height: `${imgHeightInState}px`,
        width: `${imgWidthInState}px`,
        position: `relative` as 'relative',
    }
    const imgDimesions = {
        height: '100%',
        width: '100%',
    }
    const lensDimensions = {
        height: `${lensHeightInState}px`,
        width: `${lensWidthInState}px`,
        opacity: '0.2',
        position: 'absolute',
        backgroundImage: `url("data:image/jpeg;base64,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")`,
        backgroundPosition: '50%',
        backgroundSize: '2px 2px',
    }

    const previewLensDimensions = {
        height: `${previewLensHeightInState}px`,
        width: `${previewLensWidthInState}px`,
        overflow: 'hidden',
    }
    const previewImgDimensions = {
        height: `${imgPreviewHeightInState}px`,
        width: `${imgPreviewWidthInState}px`,
    }

    const DefaultView = DefaultImgPreview({
        moveLens,
        imgContainerDimesions,
        lensDimensions,
        imgDimesions,
        previewLensDimensions,
        previewImgDimensions,
        img,
        previewImg,
        imgRefCallback,
        meshRefCallback,
        imagePreviewRefCallback,
    })

    return {
        moveLens,
        imgContainerDimesions,
        imgDimesions,
        lensDimensions,
        previewLensDimensions,
        previewImgDimensions,
        DefaultView,
        imgRefCallback,
        meshRefCallback,
        imagePreviewRefCallback,
    }
}

export { useImageZoom }
