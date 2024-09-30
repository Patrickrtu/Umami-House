import SalakoFavour from "../assets/SalakoFavour.jpg";
import Patrick from "../assets/patrick.jpg";
import Gerald from "../assets/Gerald.png"
import "../css/styles.css";

const person = {
  Gerald: {
    description: "Gerald works behind the scenes to ensure that our customers have a memorable experience.",
    picture: Gerald,
  },
  Muhammad: {
    description: "",
    picture: "",
  },
  Patrick: {
    description:
      "Patrick is focused on React.js and SQL development. He's passionate about creating seamless user experiences.",
    picture: Patrick,
  },
  Nicholas: {
    description: "",
    picture: "",
  },
  Micah: {
    description: "",
    picture: "",
  },
  Favour: {
    description:
      "Favour is one of the founders of this Culinary Masterpiece alongside 4 friends. Favour has a lot of recognitions and accolades but he would always say - The journey is more important than the destination",
    picture: SalakoFavour,
  },
};

const Cards = ({ image, desc }) => {
  return (
    <div className="containerCard">
      <div className="inner-imageCard">
        <img src={image} alt="A founders Picture" className="fab2" />
      </div>
      <div className="inner-textCard">
        <h4>{desc}</h4>
      </div>
    </div>
  );
};

function AboutUs() {
  return (
    <div>
      <h1 className="page-header">Inspiration</h1>

      <h3 className="page-section">
        {" "}
        Umami house is the culmination of passion and experience from 6 friends.
        It traces its root to a shared love and appreciation for Japanese
        Cuisine as well as business in general. Our Founders want to share the
        beauty of Japanese Cuisine with the world and believe everyone would
        come to understand as soon as you have a taste of the rich flavours and
        textures of the meals at Umami House.
      </h3>

      <h1 className="page-header">Founders</h1>
      <div className="container">
        <Cards image={person.Favour.picture} desc={person.Favour.description} />
        <Cards
          image={person.Muhammad.picture}
          desc={person.Muhammad.description}
        />
        <Cards image={person.Gerald.picture} desc={person.Gerald.description} />
        <Cards
          image={person.Patrick.picture}
          desc={person.Patrick.description}
        />
        <Cards image={person.Micah.picture} desc={person.Micah.description} />
        <Cards
          image={person.Nicholas.picture}
          desc={person.Nicholas.description}
        />
      </div>
    </div>
  );
}

export default AboutUs;
