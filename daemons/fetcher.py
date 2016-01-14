"""Saves a copy of the portfolio every day at 6:00 PM. """

import os
import time
import simplejson as json
import schedule
import portfolio
import config


def save_portfolio():
    """Saves a copy of the portfolio. """

    ymd = time.strftime('%Y-%m-%d', time.localtime(time.time()))
    positions = portfolio.init_portfolio(config.POSITIONS_FILE)
    positions_json = json.dumps(positions, use_decimal=True)
    positions_filename = ('%s-positions.json' % (ymd, ))

    try:
        os.makedirs('archive')
    except OSError:
        pass

    with open('archive/' + positions_filename, 'w') as f:
        f.write(positions_json)


save_portfolio()
schedule.every().day.at('6:00').do(save_portfolio)

while True:
    schedule.run_pending()
    time.sleep(1)
