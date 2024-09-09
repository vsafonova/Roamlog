import Footer from "../../components/Footer";
import Slider from "../../components/slider/desktop/Slider";

export default function HomePage() {
  const sectionContent = [
    {
      vectorImage: "Map.svg",
      heading: "Mark the countries you've been",
      paragraph:
        "Create your own scratch map in seconds added over 18k countries",
      screenImage: "",
    },
    {
      vectorImage: "Earth.svg",
      heading: "Create your travel bucket list",
      paragraph:
        "Easily keep track of places you've lived, visited and want to visit in the future",
    },
    {
      vectorImage: "Cup.svg",
      heading: "Track your travels",
      paragraph: "Track your travel stats",
      screenImage: "",
    },
  ];

  return (
    <>
      <Slider />
      {sectionContent.map(
        ({ vectorImage, heading, paragraph, screenImage }) => (
          <section
            key={heading}
            className="flex justify-around gap-4 pt-36 pb-16 m-auto max-w-4xl"
          >
            <div className="flex flex-col w-96">
              <img
                src={`/images/${vectorImage}`}
                className="w-20 h-20"
                alt=""
              />
              <h2 className="font-bold text-4xl mt-6 mb-4">{heading}</h2>
              <p className="text-xl w-3/4">{paragraph}</p>
            </div>
            <div>{/* <img src={`/images/${screenImage}`} /> */}</div>
          </section>
        )
      )}
      <Footer />
    </>
  );
}
