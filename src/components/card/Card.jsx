import "./Card.css"
const Card = () => {


    return (
        <main className="main">
            <section className="greetingSection">
                <p className="text">¡Hola Usuario!</p>
                <p className="text">Fecha</p>
            </section>


            <section className="cardsSection">
                <div className="card">
                    <h2 className="cardTitle">Medicamento</h2>
                    <p className="cardDosage">500mg</p>
                </div>
            </section>
        </main>
    );
};


export default Card;