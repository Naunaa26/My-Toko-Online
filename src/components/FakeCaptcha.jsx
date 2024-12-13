import React, { useState, useEffect } from "react";
import berhasil from "../assets/benar.mp3";
import gagal from "../assets/error.mp3";
import selesai from "../assets/succes.mp3";

const FakeCaptcha = ({ onVerified }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const questions = [
    {
      question: "Siapa pemenang Piala Dunia FIFA 2018?",
      options: ["Prancis", "Kroasia", "Brasil", "Jerman"],
      answer: "Prancis",
    },
    {
      question: "Siapa pemain yang paling banyak memenangkan Ballon d'Or?",
      options: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Zidane"],
      answer: "Lionel Messi",
    },
    {
      question: "Berapa jumlah pemain dalam tim sepak bola standar?",
      options: ["9", "10", "11", "12"],
      answer: "11",
    },
    {
      question: "Tim sepak bola mana yang memenangkan Piala Dunia FIFA 2014?",
      options: ["Jerman", "Argentina", "Brasil", "Spanyol"],
      answer: "Jerman",
    },
    {
      question: "Siapa pencetak gol terbanyak dalam sejarah Piala Dunia?",
      options: ["Marta", "Cristiano Ronaldo", "Miroslav Klose", "Lionel Messi"],
      answer: "Miroslav Klose",
    },
    {
      question:
        "Berapa banyak pemain yang ada dalam satu tim sepak bola saat pertandingan internasional?",
      options: ["11", "10", "9", "12"],
      answer: "11",
    },
    {
      question: "Siapa yang memenangkan Ballon d'Or pada tahun 2023?",
      options: [
        "Lionel Messi",
        "Karim Benzema",
        "Robert Lewandowski",
        "Kylian Mbappé",
      ],
      answer: "Lionel Messi",
    },
    {
      question: "Negara mana yang menjadi tuan rumah Piala Dunia 2022?",
      options: ["Qatar", "Rusia", "Brasil", "Prancis"],
      answer: "Qatar",
    },
    {
      question:
        "Siapa yang menjadi pelatih tim nasional sepak bola Inggris pada Piala Dunia 2018?",
      options: [
        "Gareth Southgate",
        "Roy Hodgson",
        "Fabio Capello",
        "Sam Allardyce",
      ],
      answer: "Gareth Southgate",
    },
    {
      question: "Tim sepak bola mana yang memenangkan Piala Eropa 2020?",
      options: ["Italia", "Prancis", "Spanyol", "Inggris"],
      answer: "Italia",
    },

    {
      question: "Siapa pemimpin Jerman selama Perang Dunia II?",
      options: [
        "Adolf Hitler",
        "Winston Churchill",
        "Joseph Stalin",
        "Franklin D. Roosevelt",
      ],
      answer: "Adolf Hitler",
    },
    {
      question: "Pada tahun berapa Perang Dunia I dimulai?",
      options: ["1912", "1914", "1916", "1918"],
      answer: "1914",
    },
    {
      question: "Di mana pertempuran D-Day selama Perang Dunia II terjadi?",
      options: ["Normandia", "Stalingrad", "Pearl Harbor", "El Alamein"],
      answer: "Normandia",
    },
    {
      question: "Apa nama perjanjian yang mengakhiri Perang Dunia I?",
      options: [
        "Perjanjian Versailles",
        "Perjanjian Potsdam",
        "Perjanjian Yalta",
        "Perjanjian Tordesillas",
      ],
      answer: "Perjanjian Versailles",
    },
    {
      question:
        "Siapa yang menjadi Presiden Amerika Serikat selama Perang Dunia II?",
      options: [
        "Franklin D. Roosevelt",
        "Harry S. Truman",
        "Dwight D. Eisenhower",
        "John F. Kennedy",
      ],
      answer: "Franklin D. Roosevelt",
    },
    {
      question: "Pada tahun berapa Perang Dunia II berakhir?",
      options: ["1943", "1944", "1945", "1946"],
      answer: "1945",
    },
    {
      question:
        "Apa nama operasi pendaratan Sekutu di Normandia pada 6 Juni 1944?",
      options: [
        "Operasi Overlord",
        "Operasi Barbarossa",
        "Operasi Torch",
        "Operasi Market Garden",
      ],
      answer: "Operasi Overlord",
    },
    {
      question: "Siapa yang memimpin Uni Soviet selama Perang Dunia II?",
      options: [
        "Joseph Stalin",
        "Leon Trotsky",
        "Nikita Khrushchev",
        "Vladimir Lenin",
      ],
      answer: "Joseph Stalin",
    },
    {
      question:
        "Apa nama kapal perang Amerika yang diserang di Pearl Harbor pada 7 Desember 1941?",
      options: [
        "USS Arizona",
        "USS Missouri",
        "USS Lexington",
        "USS Enterprise",
      ],
      answer: "USS Arizona",
    },
    {
      question:
        "Di mana pertempuran Stalingrad terjadi selama Perang Dunia II?",
      options: ["Uni Soviet", "Jerman", "Prancis", "Inggris"],
      answer: "Uni Soviet",
    },
  ];

  const taunts = [
    "Aduh, itu jawabannya? Asli, otak kamu kemana? 🤦‍♂️",
    "Serius nih? Jawabanmu bener-bener bodoh deh, butuh refresh otak? 😤",
    "Wah, jawabannya kok bisa begitu sih? Coba cek lagi deh! 🤔",
    "Hahaha, itu jawaban kamu? Mungkin kamu butuh lebih banyak latihan! 😜",
    "Aduh, jawabannya kayaknya gak nyambung deh, coba mikir lagi! 😅",
    "Oh, jadi itu jawabannya? Hmm, kayaknya otak kamu lagi libur deh! 😆",
    "Coba deh, tanya ke Google, pasti jawabannya lebih tepat! 😏",
    "Wah, jawabannya kok kayaknya dari planet lain ya? 🤨",
    "Kok bisa jawab gitu sih? Gak ada yang bener-bener masuk nih! 😂",
    "Yah, jawaban kamu malah bikin aku bingung, coba cek lagi deh! 🤭",
  ];

  useEffect(() => {
    setQuestion(generateQuestion());
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === 1) {
          resetQuestion();
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer === question.answer) {
      setCorrectStreak((prev) => prev + 1);
      setWrongAttempts(0);

      if (correctStreak + 1 === 5) {
        setIsVerified(true);
        setShowSuccessModal(true);
        new Audio(selesai).play();
        setTimeout(() => onVerified(), 1500);
      } else {
        new Audio(berhasil).play();
        resetQuestion();
      }
    } else {
      setError(true);
      setWrongAttempts((prev) => prev + 1);
      setShowErrorModal(true);
      new Audio(gagal).play();
    }
  };

  const resetQuestion = () => {
    setQuestion(generateQuestion());
    setSelectedAnswer("");
    setError(false);
    setShowErrorModal(false);
    setTimeRemaining(15);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 ">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        {question && (
          <>
            <div className="mb-6 text-center">
              <p className="text-lg font-semibold text-gray-800 dark:text-white sm:text-xl md:text-2xl">
                {question.question}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="cursor-pointer text-gray-700 dark:text-gray-200 text-sm sm:text-base"
                  >
                    {option}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-2 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200 sm:py-3"
                disabled={!selectedAnswer}
              >
                Kirim Jawaban
              </button>
            </form>

            {/* Timer */}
            <div className="mt-4">
              <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                Waktu tersisa: {timeRemaining}s
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(timeRemaining / 15) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-green-500 text-center">
                    🎉 Selamat! Kamu berhasil diverifikasi.
                  </h2>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    Kamu hebat! 🚀
                  </p>
                </div>
              </div>
            )}

            {/* Error Modal */}
            {showErrorModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-red-500 text-center">
                    Jawaban Salah!
                  </h2>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    {taunts[Math.min(wrongAttempts, taunts.length - 1)]}
                  </p>
                  <button
                    onClick={resetQuestion}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            )}

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Jawaban Benar Berturut-turut: {correctStreak}/5
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FakeCaptcha;
