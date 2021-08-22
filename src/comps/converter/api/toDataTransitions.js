import toDataGamePostion from './toDataGamePostions';

const toDataTransitions = (fromApi) => {
  let output = {};
  if (fromApi) {
    const { orders, situation } = fromApi;
    output = {
      ...orders,
      ...toDataGamePostion(situation),
    };
  }
  return {
    ...output,
  };
};

export default toDataTransitions;
