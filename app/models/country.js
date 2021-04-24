module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countryDetails", {
      countryName: {
        type: Sequelize.STRING
      },
      gmtOffset: {
        type: Sequelize.STRING
      }
    });
  
    return Country;
  };
  