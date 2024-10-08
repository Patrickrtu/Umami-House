import SalakoFavour from "../assets/SalakoFavour.jpg";
import Patrick from "../assets/patrick.jpg";
import Gerald from "../assets/Gerald.png";
import Muhammad from "../assets/Muhammad.png";
import Micah from "../assets/Micah.jpg";
import Nicholas from "../assets/Nicholas.jpg"
import "../css/styles.css";

const person = {
  Gerald: {
    description: "Gerald works behind the scenes to ensure that our customers have a memorable experience.",
    picture: Gerald,
  },
  Muhammad: {
    description: "As the front-end architect, Muhammad crafted a React-powered interface that makes menu browsing visually engaging and takeout ordering effortless, ensuring a smooth user experience from homepage to checkout.",
    picture: Muhammad,
  },
  Patrick: {
    description:
      "Patrick is focused on React.js and SQL development. He's passionate about creating seamless user experiences.",
    picture: Patrick,
  },
  Nicholas: {
    description: "As one of the founders of Umami House, Nicholas continues to pursue his passion of facilitating and supporting both his co-founders and and clientele wherever he can.",
    picture: Nicholas,
  },
  Micah: {
    description: "Micah recently joined and has focused on making small changes to the front-end and optimizing the application's deployment.",
    picture: Micah,
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
    <div className="about-container">
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

      <h1 className="page-subheader">Founders</h1>
      <div className="cards-container">
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
        <Cards 
          image={person.Micah.picture} 
          desc={person.Micah.description} 
        />
        <Cards
          image={person.Nicholas.picture}
          desc={person.Nicholas.description}
        />
      </div>
    </div>
  );
}

export default AboutUs;
