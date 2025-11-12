const CommunityHighlights = () => {
  const fakeCommunityHighlights = [
    {
      id: 1,
      title: "Sunset Overdrive",
      artist: "Abu Raihan",
      image: "https://picsum.photos/300/200?random=1",
      likes: 120,
    },
    {
      id: 2,
      title: "Mountain Mist",
      artist: "Jane Doe",
      image: "https://picsum.photos/300/200?random=2",
      likes: 95,
    },
    {
      id: 3,
      title: "City Lights",
      artist: "John Smith",
      image: "https://picsum.photos/300/200?random=3",
      likes: 87,
    },
    {
      id: 4,
      title: "Ocean Breeze",
      artist: "Alice Johnson",
      image: "https://picsum.photos/300/200?random=4",
      likes: 102,
    },
    {
      id: 5,
      title: "Digital Dreams",
      artist: "Bob Lee",
      image: "https://picsum.photos/300/200?random=5",
      likes: 76,
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-30">
      <h2 className="text-3xl font-extrabold text-primary mb-6">
        Community Highlights
      </h2>
      <div className="border-b-2 border-primary my-9"></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {fakeCommunityHighlights.map((art) => (
          <div
            key={art.id}
            className=" rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{art.title}</h3>
              <p className="text-sm text-gray-500">by {art.artist}</p>
              <p className="text-sm mt-2">{art.likes} likes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHighlights;
