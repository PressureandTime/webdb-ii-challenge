exports.seed = function(knex, Promise) {
  return knex('cars')
    .truncate()
    .then(function() {
      return knex('cars').insert([
        { VIN: '864238FHWIF', make: 'tractor', model: 'firebird', mileage: 346 },
        { VIN: 'GDFGHJK58734', make: 'horse', model: 'donkey', mileage: 5334 },
        { VIN: 'GEDRHIO68457', make: 'donkey', model: 'mule', mileage: 343442 },
      ]);
    });
};
