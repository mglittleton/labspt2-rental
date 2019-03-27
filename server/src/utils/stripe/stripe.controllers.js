import config from '../../config';
import stripeModule from 'stripe';

const keyPublishable = config.keys.stripePublishable;
const keySecret = config.keys.stripeSecret;

const stripe = stripeModule(keySecret);
const planid = 'plan_Elbu5XKLUDV9iD';
const propertyQuantity = 2; // get from redux store
const subscriptionID = '';

export const render = async (req, res, next) => {
  try {
    res.render('index.js', { keyPublishable });
  } catch (err) {
    console.error(err);
  }
};

// amount variable passed in x100
// need: amount, stripeEmail, stripeToken id, description

export const subscribe = async (req, res, next) => {
  // console.log("req.body", req.body)
  try {
    // will need billing address, email, amount
    const { id, stripeEmail } = req.body;

    stripe.customers
      .create(
        {
          email: stripeEmail,
          source: id
        },
        (err, customer) => {
          if (err) {
            return res
              .status(500)
              .json({ message: 'Failed to create new customer', err });
          } else {
            // do below
          }
        }
      )
      .then(customer => {
        // save customer id for billing
        stripe.subscriptions
          .create({
            customer: customer.id,
            items: [
              {
                plan: planid,
                quantity: propertyQuantity
              }
            ]
          })
          .then(subscription => {
            // save subscription id to the user for updating
            console.log('subscription id', subscription.id);
            res.status(200).send();
          })
          .catch(err => res.send(err));
      })
      .catch(err => res.send(err));
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

export const updateSubscription = async (req, res) => {
  try {
    stripe.subscriptions
      .update(
        `${subscriptionID}`,
        {
          items: {
            plan: planid,
            quantity: propertyQuantity
          }
        },
        (err, subscription) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            // helper function to update
          }
        }
      )
      .then(() => {
        return res
          .status(201)
          .json({ message: 'Successful subscription update!' });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// allows customer to update their CC information on file
export const updateCC = async (req, res, next) => {
  try {
    const { customer, id } = req.body;
    stripe.customers.update(`${customer.id}`, {
      source: id
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
