import { IChartModelBase } from '../../model/chart-model'
import { PriceScale } from '../../model/price-scale'
import { ISeries } from '../../model/series'
import { SeriesType } from '../../model/series-options'
import {
  SeriesItemsIndexesRange,
  TimedValue,
  visibleTimedValues,
} from '../../model/time-data'
import { ITimeScale } from '../../model/time-scale'
import { IPaneRenderer } from '../../renderers/ipane-renderer'

import { IUpdatablePaneView, UpdateType } from './iupdatable-pane-view'

export abstract class SeriesPaneViewBase<
  TSeriesType extends SeriesType,
  ItemType extends TimedValue,
  TRenderer extends IPaneRenderer,
> implements IUpdatablePaneView
{
  protected readonly _series: ISeries<TSeriesType>
  protected readonly _model: IChartModelBase
  protected _invalidated: boolean = true
  protected _dataInvalidated: boolean = true
  protected _optionsInvalidated: boolean = true
  protected _items: ItemType[] = []
  protected _itemsVisibleRange: SeriesItemsIndexesRange | null = null
  protected abstract readonly _renderer: TRenderer
  private readonly _extendedVisibleRange: boolean

  public constructor(
    series: ISeries<TSeriesType>,
    model: IChartModelBase,
    extendedVisibleRange: boolean,
  ) {
    this._series = series
    this._model = model
    this._extendedVisibleRange = extendedVisibleRange
  }

  public update(updateType?: UpdateType): void {
    this._invalidated = true
    if (updateType === 'data') {
      this._dataInvalidated = true
    }
    if (updateType === 'options') {
      this._optionsInvalidated = true
    }
  }

  public renderer(): IPaneRenderer | null {
    if (!this._series.visible()) {
      return null
    }

    this._makeValid()

    return this._itemsVisibleRange === null ? null : this._renderer
  }

  protected abstract _fillRawPoints(): void

  protected _updateOptions(): void {
    this._items = this._items.map((item: ItemType) => ({
      ...item,
      ...this._series.barColorer().barStyle(item.time),
    }))
  }

  protected abstract _convertToCoordinates(
    priceScale: PriceScale,
    timeScale: ITimeScale,
    firstValue: number,
  ): void

  protected _clearVisibleRange(): void {
    this._itemsVisibleRange = null
  }

  protected abstract _prepareRendererData(): void

  private _makeValid(): void {
    if (this._dataInvalidated) {
      this._fillRawPoints()
      this._dataInvalidated = false
    }

    if (this._optionsInvalidated) {
      this._updateOptions()
      this._optionsInvalidated = false
    }

    if (this._invalidated) {
      this._makeValidImpl()
      this._invalidated = false
    }
  }

  private _makeValidImpl(): void {
    const priceScale = this._series.priceScale()
    const timeScale = this._model.timeScale()

    this._clearVisibleRange()

    if (timeScale.isEmpty() || priceScale.isEmpty()) {
      return
    }

    const visibleBars = timeScale.visibleStrictRange()
    if (visibleBars === null) {
      return
    }

    if (this._series.bars().size() === 0) {
      return
    }

    const firstValue = this._series.firstValue()
    if (firstValue === null) {
      return
    }

    this._itemsVisibleRange = visibleTimedValues(
      this._items,
      visibleBars,
      this._extendedVisibleRange,
    )
    this._convertToCoordinates(priceScale, timeScale, firstValue.value)

    this._prepareRendererData()
  }
}
