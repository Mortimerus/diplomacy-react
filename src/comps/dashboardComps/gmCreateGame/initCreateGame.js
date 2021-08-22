import { STATE_VAL_CMCG_ALL_OK } from './stateValuesCreateGame';

const intiCreateGame = {
  name: '',
  description: '',
  variant: 'standard',
  archive: 0,
  anonymous: 0,
  silent: 0,
  cumulate: 0,
  fast: 0,
  speed_moves: 2,
  speed_retreats: 1,
  speed_adjustments: 1,
  play_weekend: 0,
  manual: 0,
  access_code: 0,
  access_restriction_reliability: 0,
  access_restriction_regularity: 0,
  access_restriction_performance: 0,
  nb_max_cycles_to_play: 100,
  pseudo: null,
  featuresOpen: false,
  accessOpen: false,
  warning1: STATE_VAL_CMCG_ALL_OK,
  callProcess: 0, // 0 not started; 1 started; 2 success, game created; 3 game already exists
};

export default intiCreateGame;
