export const Hero: React.FC = () => {
    return (
        <section className="hero container">
            <img className="hero__bg" src="/images/hero_bg.svg" alt="" />
            <div className="hero__content">
                <h1 className="hero__content-heading">Test Apps.</h1>
                <h1 className="hero__content-heading">Give Feedback.</h1>
                <button>View Apps</button>
            </div>
            <img className="hero__svg" src="/images/app_phone.svg" alt="" />
        </section>
    )
}
