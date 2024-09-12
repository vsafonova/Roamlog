import PropTypes from "prop-types";

export default function HomePageSection({
  vectorImage,
  heading,
  paragraph,
  image,
  alt,
  backgroundImage,
  justifyContent,
  textColor,
}) {
  return (
    <section className={`flex ${justifyContent} py-16`} style={backgroundImage}>
      <div className={`flex flex-col mx-40 w-96 justify-center ${textColor}`}>
        <img
          src={`/images/${vectorImage}`}
          className="w-20 h-20"
          alt="vector icon"
        />
        <h2 className="font-bold text-4xl mt-6 mb-4">{heading}</h2>
        <p className="text-xl w-3/4">{paragraph}</p>
      </div>
      {image && (
        <div className="flex justify-start items-center w-1/3">
          <img src={`/images/${image}`} alt={alt} className="h-2/3" />
        </div>
      )}
    </section>
  );
}

HomePageSection.propTypes = {
  vectorImage: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  backgroundImage: PropTypes.object,
  justifyContent: PropTypes.string,
  textColor: PropTypes.string,
};
