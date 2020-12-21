import styled from "styled-components"

interface Props {
    color: string
}

const EllipsisLoader = styled.div<Props>`
    display: inline-block;
    position: relative;

    div {
        position: absolute;
        top: 41.25%;
        width: 16.25%;
        height: 48.75%;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
        background: ${p => p.color === "primary" ? p.theme.primary : !p.color ? " #c8c8c8" : p.color}
    }

    div:nth-child(1) {
        left: 10%;
        animation: lds-ellipsis1 0.6s infinite;
    }
    div:nth-child(2) {
        left: 10%;
        animation: lds-ellipsis2 0.6s infinite;
    }
    div:nth-child(3) {
        left: 40%;
        animation: lds-ellipsis2 0.6s infinite;
    }
    div:nth-child(4) {
        left: 70%;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(184.61%, 0);
        }
    }

`

interface LoaderProps {
    color?: string;
    size?: number;
    className?: string;
    style?: Object
}

export const Loading: React.FC<LoaderProps> = ({ color = '#c8c8c8', size = 60, className, style = {} }) => {
    const circles = [...Array(4)].map((_, index) => <div key={index} />)

    return (
        <EllipsisLoader className={className} style={{
            ...style,
            width: size,
            height: size / 3
        }}
            color={color}>{circles}</EllipsisLoader>
    )
}