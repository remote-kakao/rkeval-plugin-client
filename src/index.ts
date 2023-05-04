declare const RKPlugins: { rkeval: any };

interface Data {
  [key: string]: string | number | boolean | undefined | Data;
}

RKPlugins.rkeval = {
  onEvent(
    msg: { event: string; data: Data; session: string },
    sendReply: <T>(data: T) => void,
  ) {
    if (msg.event === 'rkeval' && msg.data.code) {
      const result = String(
        (() => {
          try {
            return eval(msg.data.code.toString());
          } catch (err) {
            return err;
          }
        })(),
      );

      sendReply(result);
    }
  },
};
