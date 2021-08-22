const toGameTime = (gameDetails, gameYearZero) => {
  let oupt = {};

  if (gameYearZero && (gameDetails !== undefined)) {
    const yearZero = parseInt(gameYearZero, 10);
    const currentAdvancement = gameDetails.current_advancement;
    const currentAdvancementPlusOne = parseInt(currentAdvancement, 10) + 1;
    const yearPointSeason = currentAdvancementPlusOne / 5;
    const yearSeasonArr = yearPointSeason % 1
     !== 0 ? yearPointSeason.toString().split('.')
      : [yearPointSeason.toString(), '0'];
    let yearOutPut = 0;
    if (currentAdvancement > 0) {
      const yearPointSeason2 = (currentAdvancement / 5).toString().split('.')[0];
      yearOutPut = parseInt(yearPointSeason2, 10);
    }
    // const year = parseInt(yearSeasonArr[0], 10);
    const seasonInt = parseInt(yearSeasonArr[1], 10);
    // 2 spring to move
    // 4 spring to retreat
    // 6 fall to move
    // 8 fall to retreat
    // 0 fall to build
    const realYear = yearZero + yearOutPut + 1;
    const deadLine = gameDetails.deadline;
    const currentGameTime = {
      year: realYear,
      seasonInt,
      season: (seasonInt < 6 && seasonInt !== 0 ? 'spring' : 'fall'),
      turnType: (
        (seasonInt === 2 ? 'move' : '')
        || (seasonInt === 6 ? 'move' : '')
        || (seasonInt === 4 ? 'retreat' : '')
        || (seasonInt === 8 ? 'retreat' : '')
        || (seasonInt === 0 ? 'build' : '')
      ),
      deadLine,
    };
    oupt = currentGameTime;
  }
  return oupt;
};

export default toGameTime;
