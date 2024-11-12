export const restaurantes = [
  {
      name: "Lo De Monik",
      image: 'src/assets/rest1.2.jpg',
      exampleImages: ['src/assets/rest3.jpg', 'src/assets/rest1.jpg'],
      hours: {
          Monday: { openingTime: "11 AM", closingTime: "11 PM" },
          Tuesday: { openingTime: "11 AM", closingTime: "11 PM" },
          Wednesday: { openingTime: "11 AM", closingTime: "11 PM" },
          Thursday: { openingTime: "11 AM", closingTime: "11 PM" },
          Friday: { openingTime: "11 AM", closingTime: "12 AM" }, // Abierto hasta medianoche
          Saturday: { openingTime: "10 AM", closingTime: "12 AM" }, // Abre más temprano
          Sunday: { openingTime: "10 AM", closingTime: "11 PM" } // Abre más temprano
      },
      stars: 48,
      address: "4JRV+FQ5, Chacon y, Compostela, La Habana",
      phone: "(07) 8644029"
  },
  {
      name: "Paladar Doña Eutimia",
      image: 'src/assets/rest1.jpg',
      exampleImages: ['src/assets/rest3.jpg', 'src/assets/rest1.jpg'],
      hours: {
          Monday: { openingTime: "12 PM", closingTime: "10 PM" },
          Tuesday: { openingTime: "12 PM", closingTime: "10 PM" },
          Wednesday: { openingTime: "12 PM", closingTime: "10 PM" },
          Thursday: { openingTime: "12 PM", closingTime: "10 PM" },
          Friday: { openingTime: "12 PM", closingTime: "11 PM" }, // Abierto hasta las 11 PM
          Saturday: { openingTime: "12 PM", closingTime: "11 PM" },
          Sunday: { openingTime: null, closingTime:null } // Cerrado
      },
      stars: 44, // Estrellas añadidas
      address:"60-C, Callejon del Chorro, La Habana",
      phone:"(07) 8013332",
      services:["Outdoor seating","Good cocktails"]
  },
  {
      name:"Sibarita Habana",
      image: 'src/assets/rest1.3.jpg',
      hours:{
          Monday:{openingTime:"1 PM", closingTime:"10 PM"},
          Tuesday:{openingTime:"1 PM", closingTime:"10 PM"},
          Wednesday:{openingTime:"1 PM", closingTime:"10 PM"},
          Thursday:{openingTime:"1 PM", closingTime:"10 PM"},
          Friday:{openingTime:"1 PM", closingTime:"11 PM"},
          Saturday:{openingTime:"1 PM", closingTime:"11 PM"},
          Sunday:{openingTime:null, closingTime:null} // Cerrado
      },
      stars: 45, // Estrellas añadidas
      services:["Good cocktails"],
      address:"528 O'Reilly, La Habana",
      phone:"05 2670512"
  },
  {
      name:"El Rincón de la Abuela",
      image: 'src/assets/rest3.jpg',
      hours:{
          Monday:{openingTime:null, closingTime:null}, // Cerrado
          Tuesday:{openingTime:"12 PM", closingTime:"10 PM"},
          Wednesday:{openingTime:"12 PM", closingTime:"10 PM"},
          Thursday:{openingTime:"12 PM", closingTime:"10 PM"},
          Friday:{openingTime:"12 PM", closingTime:"10 PM"},
          Saturday:{openingTime:"12 PM", closingTime:"10 PM"},
          Sunday:{openingTime:null, closingTime:null} // Cerrado
      },
      stars: 45,
      address:"123 Calle de la Paz, La Habana",
      phone:"(07) 1234567",
      services:["Home delivery","Takeout"]
  },
  {
      name:"Café de la Plaza",
      image: 'src/assets/rest4.jpg',
      hours:{
          Monday:{openingTime:"8 AM", closingTime:"8 PM"},
          Tuesday:{openingTime:"8 AM", closingTime:"8 PM"},
          Wednesday:{openingTime:"8 AM", closingTime:"8 PM"},
          Thursday:{openingTime:"8 AM", closingTime:"8 PM"},
          Friday:{openingTime:"8 AM", closingTime:"9 PM"}, // Abierto hasta las 9PM
          Saturday:{openingTime:"8 AM", closingTime:"9 PM"},
          Sunday:{openingTime:null, closingTime:null} // Cerrado
      },
      stars: 50,
      address:"Plaza Vieja, La Habana",
      phone:"(07) 7654321",
      services:["Free Wi-Fi","Breakfast"]
  }
];


export default restaurantes;
