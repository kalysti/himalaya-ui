import { undefinedIfNull } from '../../helpers/strict-type-checks'

import { BarPrice } from '../../model/bar'
import { IChartModelBase } from '../../model/chart-model'
import { Coordinate } from '../../model/coordinate'
import { PlotRowValueIndex } from '../../model/plot-data'
import { PricedValue, PriceScale } from '../../model/price-scale'
import { ISeries } from '../../model/series'
import { ISeriesBarColorer } from '../../model/series-bar-colorer'
import { SeriesPlotRow } from '../../model/series-data'
import { TimedValue, TimePointIndex } from '../../model/time-data'
import { ITimeScale } from '../../model/time-scale'
import { IPaneRenderer } from '../../renderers/ipane-renderer'

import { SeriesPaneViewBase } from './series-pane-view-base'

export abstract class LinePaneViewBase<
  TSeriesType extends 'Line' | 'Area' | 'Baseline' | 'Histogram',
  ItemType extends PricedValue & TimedValue,
  TRenderer extends IPaneRenderer,
> extends SeriesPaneViewBase<TSeriesType, ItemType, TRenderer> {
  public constructor(series: ISeries<TSeriesType>, model: IChartModelBase) {
    super(series, model, true)
  }

  protected _convertToCoordinates(
    priceScale: PriceScale,
    timeScale: ITimeScale,
    firstValue: number,
  ): void {
    timeScale.indexesToCoordinates(this._items, undefinedIfNull(this._itemsVisibleRange))
    priceScale.pointsArrayToCoordinates(
      this._items,
      firstValue,
      undefinedIfNull(this._itemsVisibleRange),
    )
  }

  protected abstract _createRawItem(
    time: TimePointIndex,
    price: BarPrice,
    colorer: ISeriesBarColorer<TSeriesType>,
  ): ItemType

  protected _createRawItemBase(
    time: TimePointIndex,
    price: BarPrice,
  ): PricedValue & TimedValue {
    return {
      time: time,
      price: price,
      x: NaN as Coordinate,
      y: NaN as Coordinate,
    }
  }

  protected _fillRawPoints(): void {
    const colorer = this._series.barColorer()
    this._items = this._series
      .bars()
      .rows()
      .map((row: SeriesPlotRow<TSeriesType>) => {
        const value = row.value[PlotRowValueIndex.Close] as BarPrice
        return this._createRawItem(row.index, value, colorer)
      })
  }
}
