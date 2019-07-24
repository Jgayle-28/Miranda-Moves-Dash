const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  phonetype: {
    type: String
  },
  phoneext: {
    type: String
  },
  referedby: {
    type: String
  },
  movedate: {
    type: Date
  },
  contactcomments: {
    type: String
  },
  // begin estimate info
  // moveinfo: {
  //   from: {
  //     type: String,
  //     required: true
  //   },
  //   to: {
  //     type: String,
  //     required: true
  //   }
  // },
  // estimate: {
  //   totalcost: {
  //     type: Number
  //   },
  //   totaltime: {
  //     type: Number
  //   },
  //   itemtotal: {
  //     type: Number
  //   },
  //   itemslist: {
  //     type: Array,
  //     default: []
  //   },
  //   totaltrucks: {
  //     type: Number
  //   },
  //   totalmen: {
  //     type: Number
  //   }
  // },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contact', ContactSchema);
