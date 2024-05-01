import env from '#shared/infrastructure/adonis/env';
import { defineConfig, transports } from '@adonisjs/mail';

export default defineConfig({
  default: 'resend',

  /**
   * A static address for the "from" property. It will be
   * used unless an explicit from address is set on the
   * Email
   */
  from: {
    address: 'eperform.solution@gmail.com',
    name: 'EPerform Solution',
  },

  /**
   * A static address for the "reply-to" property. It will be
   * used unless an explicit replyTo address is set on the
   * Email
   */
  replyTo: {
    address: '',
    name: '',
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or the same transport with a different
   * options.
   */
  mailers: {
    resend: transports.resend({
      key: env.get('RESEND_API_KEY'),
      baseUrl: 'https://api.resend.com',
    }),
  },
});
