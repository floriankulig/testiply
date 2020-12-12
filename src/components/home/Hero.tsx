import { useIsMobile } from "hooks"

export const Hero: React.FC = () => {
    const isMobile = useIsMobile(960);

    return (
        <section className="hero container">
            <img className={`hero__bg ${isMobile ? "mobile" : ""}`} src={`/images/hero_bg${isMobile ? "-mobile" : ""}.svg`} alt="" />
            <div className="hero__content">
                <h1 className="hero__content-heading">Test Apps.</h1>
                <h1 className="hero__content-heading">Give Feedback.</h1>
                <button>View Apps</button>
            </div>
            {!isMobile && <img className="hero__svg" src="/images/app_phone.svg" alt="" />}
        </section>
    )
}
