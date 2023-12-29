import profilePic from "./assets/profile.png";

function Card() {
  return (
    <div className="card">
      <img className="card-image" src={profilePic} alt="picture" />
      <h2 className="card-title">Rivindu dilochana</h2>
      <p className="card-text">I still studying</p>
    </div>
  );
}

export default Card;
