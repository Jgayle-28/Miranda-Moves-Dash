const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  opportunity_type: {
    type: String
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
    type: String
  },
  move_time: {
    type: String
  },
  contact_comments: {
    type: String
  },
  estimate_time: {
    type: String
  },
  estimate_date: {
    type: String
  },
  target_movedate: {
    type: ''
  },
  pu_address: {
    type: String
  },
  do_address: {
    type: String
  },
  items: [
    {
      item_id: {
        type: String
      },
      item: {
        type: String
      },
      item_qty: {
        type: String
      }
    }
  ],
  alt_phone: {
    type: String
  },
  payment_type: {
    type: String
  },
  bill_to: {
    type: String
  },
  // begin estimate info
  inventory: [
    {
      roomName: {
        type: String
      },
      items: [
        {
          name: {
            type: String
          },
          itemAmt: {
            type: Number
          },
          volume: {
            type: String
          },
          weight: {
            type: String
          },
          calcVolume: {
            type: Number
          },
          calcWeight: {
            type: Number
          }
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
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
});

module.exports = mongoose.model('contact', ContactSchema);
