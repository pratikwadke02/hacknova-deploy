import randomstring from "randomstring";

export const videolink = async (req, res) => {
  try {
    let slug = randomstring.generate({
      length: 16,
      charset: "alphabetic",
    });
    const meetlink = `meet.jit.si/${slug}`;
    const data = {
      link: meetlink
    }
    res.send(data);
  } catch(err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
