import { Link } from "react-router";

const TopArtists = () => {
  const fakeTopArtists = [
    {
      id: 1,
      name: "Abu Raihan",
      email: "aburaihan@example.com",
      avatar: "https://i.pravatar.cc/150?img=10",
      totalLikes: 120,
      totalArtworks: 8,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://i.pravatar.cc/150?img=20",
      totalLikes: 110,
      totalArtworks: 10,
    },
    {
      id: 3,
      name: "John Smith",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=30",
      totalLikes: 95,
      totalArtworks: 7,
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "https://i.pravatar.cc/150?img=40",
      totalLikes: 90,
      totalArtworks: 9,
    },
    {
      id: 5,
      name: "Bob Lee",
      email: "bob@example.com",
      avatar: "https://i.pravatar.cc/150?img=50",
      totalLikes: 85,
      totalArtworks: 6,
    },
  ];
  return (
    <div className="w-11/12 mx-auto my-30">
      <h2 className="text-3xl font-extrabold text-primary mb-6">
        Top Artists of the Week
      </h2>
      <div className="border-b-2 border-primary my-9"></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {fakeTopArtists.map((artist) => (
          <div
            key={artist.id}
            className=" rounded-xl p-4 flex flex-col items-center bg-white shadow-sm"
          >
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-24 h-24 rounded-full mb-3"
            />
            <h3 className="font-bold text-gray-500 text-lg">{artist.name}</h3>
            <p className="text-sm text-gray-500">{artist.email}</p>
            <p className="mt-2 text-sm text-gray-500">
              {artist.totalArtworks} artworks • {artist.totalLikes} likes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
