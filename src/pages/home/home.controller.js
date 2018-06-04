class WelcomeController {
  constructor ($http) {
    this.$http = $http;
  }

  inputChanged() {
    if (!this.startPoint || !this.endPoint) {
      return;
    }

    const startPointCoords = this.startPoint.originalObject.Point.pos;
    const endPointCoords = this.endPoint.originalObject.Point.pos;

    const startLat = +startPointCoords.split(' ')[0];
    const startLong = +startPointCoords.split(' ')[1];
    const endLat = +endPointCoords.split(' ')[0];
    const endLong = +endPointCoords.split(' ')[1];

    const midPointLat = (+startLat + +endLat) / 2;
    const midPointLong = (+startLong + +endLong) / 2;

    const firstLine = new ymaps.GeoObject({
        // Описываем геометрию геообъекта.
        geometry: {
            // Тип геометрии - "Ломаная линия".
            type: "LineString",
            // Указываем координаты вершин ломаной.
            coordinates: [
                [startLong, startLat],
                [midPointLong, midPointLat]
            ]
        },
        // Описываем свойства геообъекта.
        properties:{
            // Содержимое хинта.
            hintContent: "Я геообъект",
            // Содержимое балуна.
            balloonContent: "Меня можно перетащить"
        }
      }, {
          // Задаем опции геообъекта.
          // Включаем возможность перетаскивания ломаной.
          draggable: true,
          // Цвет линии.
          strokeColor: "#FFFF00",
          // Ширина линии.
          strokeWidth: 5
      });

      const secondLine = new ymaps.GeoObject({
        // Описываем геометрию геообъекта.
        geometry: {
            // Тип геометрии - "Ломаная линия".
            type: "LineString",
            // Указываем координаты вершин ломаной.
            coordinates: [
                [midPointLong, midPointLat],
                [endLong, endLat]
            ]
        },
        // Описываем свойства геообъекта.
        properties:{
            // Содержимое хинта.
            hintContent: "Я геообъект",
            // Содержимое балуна.
            balloonContent: "Меня можно перетащить"
        }
      }, {
          // Задаем опции геообъекта.
          // Включаем возможность перетаскивания ломаной.
          draggable: true,
          // Цвет линии.
          strokeColor: "#0FFF00",
          // Ширина линии.
          strokeWidth: 5
      });

      myMap.geoObjects
        .add(firstLine)
        .add(secondLine);
      
      myMap.setBounds(secondLine.geometry.getBounds());
  }

  responseFormatter(data) {
    const points = data.response.GeoObjectCollection.featureMember;
    const countries = [];

    if (points.length) {
      points.forEach(point => {
        countries.push(point.GeoObject);
      });
    }
    return countries; 
  }
}
export default WelcomeController;
