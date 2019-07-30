const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  contact_type: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  phone_type: {
    type: String
  },
  phone_ext: {
    type: String
  },
  refered_by: {
    type: String
  },
  move_date: {
    type: Date
  },
  contact_comments: {
    type: String
  },
  estimate_time: {
    type: String
  },
  estimate_date: {
    type: Date
  },
  target_movedate: {
    type:Date,
  },
  pu_address: {
    type: String
  },
  do_address: {
    type: String
  }
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
