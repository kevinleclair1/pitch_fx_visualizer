const express = require('express');
const cornelius = require('cornelius');
const gameday = require('gameday-helper');
const cheerio = require('cheerio');
const rp = require('request-promise');

const uniq = require('lodash/uniq');

const isArray = require('lodash/isArray')

const router = express.Router();

const getBatterInfo = async (pitchData) => {
  const batterIds = uniq(pitchData.map((pitch) => pitch.batter_id));

  const batters = await Promise.all(batterIds.map((id) => cornelius.getPlayer(id)))

  return pitchData.map((pitch) => {
    const batter = batters.find((batterData) => batterData.player_info.queryResults.row.player_id === pitch.batter_id)

    return Object.assign(
      {},
      pitch,
      { 
        batter_name: batter.player_info.queryResults.row.name_display_first_last
      }
    )
  })
};

// scrape brooks baseball tables

router.get('/pitchdata', async (req, res) => {
  const { game_id, pitcher_id } = req.query

  const options = {
    url: `http://www.brooksbaseball.net/pfxVB/tabdel_expanded.php?pitchSel=${pitcher_id}&game=gid_${game_id}/&s_type=&h_size=700&v_size=500`,
    transform: (body) => cheerio.load(body)
  }

  const $ = await rp(options);

  const resData = [];

  $('tr').each((i, trEl) => {
    // first row is the header so disregard
    if (!i) return;

    const data = {}

    $('th').each((index, thEl) => {
      data[$(thEl).text()] = $($(trEl).children('td')[index]).text()
    });

    resData.push(data)
  }); 

  const resDataWithBatters = await getBatterInfo(resData)

  res.send({ data: resDataWithBatters })

})

router.get('/pitchers', async (req, res) => {
  const game_id = req.query.game_id

  const gameData = await gameday.boxscore(`gid_${game_id}`)

  const parsedData = JSON.parse(gameData).data

  const { home_fname: homeTeam, away_fname: awayTeam } = parsedData.boxscore

  const pitchers = parsedData.boxscore.pitching.map((team) => {
    if (!isArray(team.pitcher)) {
      team.pitcher = [team.pitcher]
    }

    return team.pitcher.map((pitcher) => {
      return Object.assign({}, pitcher, {
        teamName: team.team_flag === 'away' ? awayTeam : homeTeam
      })
    })
  })

  res.send({
    data: [].concat(...pitchers)
  });
})

router.get('/games', async (req, res) => {
  const gameLists = await gameday.miniScoreboard( req.query.date ? new Date(req.query.date) : null )
  res.send({
    data: gameLists.game
  })
});

module.exports = router;
