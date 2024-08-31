<template>
  <div :class="$style.dashboard">
    <div :class="$style.imageProcessing201910249087" />
    <div :class="$style.div" />
    <img :class="$style.dashboardChild" alt="" src="/group-272.svg" />
    <main :class="$style.navigationSideParent">
      <NavigationSide />
      <section :class="$style.content">
        <div :class="$style.pageHeader">
          <TopNav />
          <div :class="$style.contentMetrics">
            <div :class="$style.metricCards">
              <div :class="$style.metricCardContainer">
                <div :class="$style.metricCardRows">
                  <div :class="$style.ordersParent">
                    <div :class="$style.orders">Orders</div>
                    <div :class="$style.frameChild" />
                    <div :class="$style.totalRevenue">Total Revenue</div>
                    <div :class="$style.aed1524523">
                      <span :class="$style.aed">AED</span>
                      <b :class="$style.b"> 15,245.23</b>
                    </div>
                    <div :class="$style.currentMonth">Current Month</div>
                  </div>
                  <OrderCardRow
                    offers="Offers"
                    orderCardTotalLabel="13,090"
                    orderCardActiveLabel="11,128"
                    orderCardPendingLabel="24"
                  />
                </div>
                <div :class="$style.metricCardRows">
                  <div :class="$style.rectangleParent">
                    <div :class="$style.frameItem" />
                    <div :class="$style.appointmentsCardParent">
                      <div :class="$style.appointmentsCard">
                        <div :class="$style.appointments">Appointments</div>
                        <div :class="$style.thisWeek">This week</div>
                      </div>
                      <div :class="$style.revenueBreakdown">
                        <div :class="$style.totalRevenueRow">
                          <b :class="$style.totalRevenueLabel">9,090</b>
                          <b :class="$style.totalRevenueLabel">8,954</b>
                        </div>
                        <div :class="$style.activeRevenueRow">
                          <div :class="$style.activeRevenueLabels">
                            <div :class="$style.total">Total</div>
                            <div :class="$style.active">Active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :class="$style.aEDContainerParent">
                      <div :class="$style.aEDContainer">
                        <div :class="$style.currentMonthAEDContainer">
                          <div :class="$style.currentMonthAEDRow">
                            <div :class="$style.weekly">Weekly</div>
                          </div>
                          <img
                            :class="$style.vuesaxboldarrowDownIcon"
                            alt=""
                            src="/vuesaxboldarrowdown.svg"
                          />
                        </div>
                      </div>
                      <div :class="$style.pendingRevenueRow">
                        <b :class="$style.pendingRevenueLabel">136</b>
                        <div :class="$style.pendingRevenueContainer">
                          <div :class="$style.pending">Pending</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <OrderCardRow
                    propBorderRadius="16px"
                    propMinWidth="192px"
                    propBorderRadius1="16px"
                    offers="Orders"
                    propMinWidth1="52px"
                    orderCardTotalLabel="11,123"
                    orderCardActiveLabel="10,088"
                    orderCardPendingLabel="1035"
                  />
                </div>
                <div :class="$style.chartContainer">
                  <div :class="$style.sat">SAT</div>
                  <div :class="$style.vectorParent">
                    <img
                      :class="$style.frameInner"
                      alt=""
                      src="/vector-452.svg"
                    />
                    <div :class="$style.lineWrapper">
                      <div :class="$style.lineDiv" />
                    </div>
                    <div :class="$style.lineContainer">
                      <div :class="$style.lineDiv" />
                    </div>
                    <div :class="$style.lineContainer">
                      <div :class="$style.lineDiv" />
                    </div>
                    <div :class="$style.lineContainer">
                      <div :class="$style.lineDiv" />
                    </div>
                    <div :class="$style.lineContainer">
                      <div :class="$style.lineDiv" />
                    </div>
                    <div :class="$style.lineContainer">
                      <div :class="$style.lineDiv" />
                    </div>
                    <div :class="$style.frameChild6" />
                  </div>
                  <div :class="$style.chartLabels">
                    <div :class="$style.revenueLabelContainer">
                      <div :class="$style.revenue">Revenue</div>
                    </div>
                    <div :class="$style.monthlyLabelContainer">
                      <div :class="$style.monthlyDropdownContainer">
                        <div :class="$style.monthly">Monthly</div>
                      </div>
                      <img
                        :class="$style.vuesaxboldarrowDownIcon"
                        alt=""
                        src="/vuesaxboldarrowdown.svg"
                      />
                    </div>
                  </div>
                  <div :class="$style.chartScale">
                    <div :class="$style.k">60k</div>
                    <div :class="$style.chartBarsContainer">
                      <div :class="$style.bars">
                        <div :class="$style.weeklyBars">
                          <div :class="$style.bar">50k</div>
                          <div :class="$style.bar">40k</div>
                          <div :class="$style.bar">30k</div>
                          <div :class="$style.bar">20k</div>
                          <div :class="$style.bar">10k</div>
                          <div :class="$style.bar">0</div>
                        </div>
                      </div>
                      <div :class="$style.chartScale1">
                        <div :class="$style.amountScale">
                          <div :class="$style.revenueScale">
                            <img
                              :class="$style.unionIcon"
                              loading="lazy"
                              alt=""
                              src="/union.svg"
                            />
                            <div :class="$style.aed4209152">
                              <span>AED 42,091</span>
                              <span :class="$style.span">.52</span>
                            </div>
                          </div>
                        </div>
                        <div :class="$style.scalePointer">
                          <img :class="$style.scalePointerChild" alt="" />
                          <div :class="$style.pointerCircle" />
                          <div :class="$style.pointerDot" />
                        </div>
                        <div :class="$style.weekdays">
                          <div :class="$style.sun">SUN</div>
                          <div :class="$style.sun">MON</div>
                          <div :class="$style.sun">TUES</div>
                          <div :class="$style.sun">WED</div>
                          <div :class="$style.sun">THURS</div>
                          <div :class="$style.sun">FRI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div :class="$style.serviceFilters">
                  <div :class="$style.filterInput">
                    <div :class="$style.verticals">Verticals</div>
                    <div :class="$style.searchFilterIcons">
                      <div :class="$style.searchFilterIcon">
                        <div :class="$style.vuesaxlinearsearchNormal">
                          <img
                            :class="$style.vuesaxlinearsearchNormalIcon"
                            loading="lazy"
                            alt=""
                            src="/vuesaxlinearsearchnormal.svg"
                          />
                        </div>
                      </div>
                      <div :class="$style.searchFilterIcon">
                        <img
                          :class="$style.vuesaxlinearsearchNormalIcon"
                          loading="lazy"
                          alt=""
                          src="/vuesaxlinearfiltersearch.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div :class="$style.serviceCards">
                    <div :class="$style.cardservicesvertical">
                      <div :class="$style.cardImage">
                        <img
                          :class="$style.illustrationhomeRepairMai"
                          loading="lazy"
                          alt=""
                          src="/illustrationhome-repair--maintenance-services@2x.png"
                        />
                      </div>
                      <div :class="$style.cardTitle">
                        <div :class="$style.eventManagement">
                          Event Management
                        </div>
                      </div>
                      <div :class="$style.cardFooter">
                        <div :class="$style.cardPerformance">
                          <div :class="$style.cardBars">
                            <b :class="$style.performanceBar">1,034</b>
                            <div :class="$style.lastMonthLabel">
                              <div :class="$style.monthLabel">+ 25%</div>
                              <div :class="$style.lastMonth">Last month</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :class="$style.cardservicesvertical">
                      <div :class="$style.cardImage">
                        <img
                          :class="$style.illustrationhomeRepairMai"
                          loading="lazy"
                          alt=""
                          src="/illustrationhome-repair--maintenance-services-1@2x.png"
                        />
                      </div>
                      <div :class="$style.cardTitle">
                        <div :class="$style.eventManagement">
                          Legal Services
                        </div>
                      </div>
                      <div :class="$style.cardFooter">
                        <div :class="$style.cardPerformance">
                          <div :class="$style.cardBars">
                            <b :class="$style.performanceBar">1,034</b>
                            <div :class="$style.lastMonthLabel">
                              <div :class="$style.monthLabel">+ 25%</div>
                              <div :class="$style.lastMonth">Last month</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :class="$style.cardservicesvertical">
                      <div :class="$style.cardImage">
                        <img
                          :class="$style.illustrationhomeRepairMai"
                          loading="lazy"
                          alt=""
                          src="/illustrationhome-repair--maintenance-services-2@2x.png"
                        />
                      </div>
                      <div :class="$style.cardTitle">
                        <div :class="$style.businessSetup">
                          Business Setup & Registration
                        </div>
                      </div>
                      <div :class="$style.cardFooter">
                        <div :class="$style.cardPerformance">
                          <div :class="$style.cardBars">
                            <b :class="$style.performanceBar">1,034</b>
                            <div :class="$style.lastMonthLabel">
                              <div :class="$style.monthLabel">+ 25%</div>
                              <div :class="$style.lastMonth">Last month</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :class="$style.cardservicesvertical">
                      <div :class="$style.cardImage">
                        <img
                          :class="$style.illustrationhomeRepairMai"
                          loading="lazy"
                          alt=""
                          src="/illustrationhome-repair--maintenance-services-3@2x.png"
                        />
                      </div>
                      <div :class="$style.cardTitle">
                        <div :class="$style.eventManagement">
                          Business Consultancy
                        </div>
                      </div>
                      <div :class="$style.cardFooter">
                        <div :class="$style.cardPerformance">
                          <div :class="$style.cardBars">
                            <b :class="$style.performanceBar">1,034</b>
                            <div :class="$style.lastMonthLabel">
                              <div :class="$style.monthLabel">+ 25%</div>
                              <div :class="$style.lastMonth">Last month</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div :class="$style.viewMoreButton">
                    <img
                      :class="$style.viewMoreButtonChild"
                      alt=""
                      src="/rectangle-2332.svg"
                    /><button propFlex="1" text="View all" />
                  </div>
                </div>
              </div>
              <div :class="$style.vendorGrowthGraph">
                <div :class="$style.graphShowingVendor">
                  Graph showing vendor growth per vertical.
                </div>
              </div>
            </div>
            <div :class="$style.financialSummary">
              <div :class="$style.subscriptionsFunds">
                <div :class="$style.subscriptionFundPanels">
                  <div :class="$style.rectangleGroup">
                    <div :class="$style.rectangleDiv" />
                    <div :class="$style.subscriptionFund">
                      <div :class="$style.noOfVendors">No. of Vendors</div>
                      <div :class="$style.subscriptionStatus">
                        <b :class="$style.paidStatus">4,245</b>
                        <div :class="$style.currentMonth">Current Month</div>
                      </div>
                      <div :class="$style.subscriptionChart">
                        <div :class="$style.chartBars">
                          <div :class="$style.chartElements">
                            <div :class="$style.chartElementsChild" />
                            <div :class="$style.chartElementsItem" />
                            <div :class="$style.chartElementsInner" />
                          </div>
                        </div>
                        <div :class="$style.subscriptionPercentages">
                          <div :class="$style.earlyAccessPercentage">75%</div>
                          <div :class="$style.activeSubscriptionPercentage">
                            25%
                          </div>
                          <div :class="$style.activeSubscriptionPercentage">
                            25%
                          </div>
                        </div>
                        <div :class="$style.subscriptionLabels">
                          <div :class="$style.subscriptionLabel">
                            <div :class="$style.earlyAccess">Early access</div>
                            <div :class="$style.activeSubscriptionLabel">
                              <div :class="$style.activeSubs">Active subs</div>
                            </div>
                            <div :class="$style.inactiveSubscriptionLabel">
                              <div :class="$style.inactive">Inactive</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <WeeklyPerformance group48096132="/group-48096132.svg" />
                  </div>
                  <FinancialData
                    vuesaxlinearemptyWallet="/vuesaxlinearemptywallet.svg"
                    paidInvoices="Paid Invoices"
                    prop=" 3,20,293.23"
                  />
                  <div :class="$style.cardBorder">
                    <div :class="$style.cardBorderChild" />
                    <div :class="$style.entities">
                      <div :class="$style.entitiesHeader">
                        <div :class="$style.organizationsHeader">
                          <div :class="$style.topOraganizations">
                            Top Oraganizations
                          </div>
                        </div>
                        <div :class="$style.appointmentLook">
                          <p :class="$style.appointment">Appointment</p>
                          <p :class="$style.appointment">Look</p>
                        </div>
                      </div>
                    </div>
                    <div :class="$style.vuesaxlinearsearchNormalWrapper">
                      <div :class="$style.vuesaxlinearsearchNormal">
                        <img
                          :class="$style.vuesaxlinearsearchNormalIcon"
                          alt=""
                          src="/vuesaxlinearsearchnormal.svg"
                        />
                      </div>
                    </div>
                    <EntitiesList
                      separator="374"
                      oR="OR"
                      separator1="971"
                      oR1="OR"
                      separator2="268"
                      oR2="OR"
                      separator3="635"
                      oR3="OR"
                      rectangle2332="/rectangle-23321.svg"
                      propFlex="unset"
                    />
                  </div>
                </div>
                <div :class="$style.extraContent">
                  <div :class="$style.graphShowingVendor">
                    BD Details Come here
                  </div>
                </div>
              </div>
              <div :class="$style.subscriptionsFunds">
                <div :class="$style.subscriptionFundPanels">
                  <div :class="$style.rectangleContainer">
                    <div :class="$style.rectangleDiv" />
                    <div :class="$style.frameGroup">
                      <div :class="$style.subscriptionsParent">
                        <div :class="$style.subscriptions">Subscriptions</div>
                        <div :class="$style.subscriptionPeriod">
                          <b :class="$style.current">1,204</b>
                          <div :class="$style.currentMonth">Current Month</div>
                        </div>
                      </div>
                      <div :class="$style.frameParent1">
                        <div :class="$style.paidBarParent">
                          <div :class="$style.paidBar">
                            <div :class="$style.paidBarChild" />
                          </div>
                          <div :class="$style.paidPercentage">62%</div>
                          <div :class="$style.subscriptionLabels">
                            <div :class="$style.paid">Paid</div>
                          </div>
                        </div>
                        <div :class="$style.subscriptionPercentages">
                          <div :class="$style.trailBar">
                            <div :class="$style.paidBar">
                              <div :class="$style.trailElementsChild" />
                            </div>
                            <div :class="$style.paidPercentage">24%</div>
                            <div :class="$style.subscriptionLabels">
                              <div :class="$style.trail">Trail</div>
                            </div>
                          </div>
                          <div :class="$style.cancelStatus">
                            <div :class="$style.paidBar">
                              <div :class="$style.trailElementsChild" />
                            </div>
                            <div :class="$style.cancelPercentage">14%</div>
                            <div :class="$style.cancelLabel">
                              <div :class="$style.cancel">Cancel</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <WeeklyPerformance group48096132="/group-48096133.svg" />
                  </div>
                  <FinancialData
                    vuesaxlinearemptyWallet="/vuesaxlinearwallet.svg"
                    paidInvoices="Fund Receives"
                    propMinWidth="92px"
                    prop=" 15,245.23"
                  />
                  <div :class="$style.cardBorder1">
                    <div :class="$style.cardBorderChild" />
                    <div :class="$style.cardBorderInner">
                      <div :class="$style.frameParent2">
                        <div :class="$style.topVendorsWrapper">
                          <div :class="$style.topVendors">Top Vendors</div>
                        </div>
                        <div :class="$style.ordersCompleted">
                          Orders Completed
                        </div>
                      </div>
                    </div>
                    <EntitiesList
                      propBackgroundColor="#ccddff"
                      separator="873"
                      oR="VR"
                      propPadding="unset"
                      propBackgroundColor1="#ccddff"
                      propWidth="38px"
                      separator1="123"
                      oR1="VR"
                      propBackgroundColor2="#ccddff"
                      separator2="4211"
                      oR2="VR"
                      propBackgroundColor3="#ccddff"
                      separator3="4211"
                      oR3="VR"
                      rectangle2332="/rectangle-23321.svg"
                    />
                  </div>
                </div>
                <div :class="$style.upcomingEventsWrapper">
                  <div :class="$style.graphShowingVendor">Upcoming Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <div :class="$style.searchContainer">
      <div :class="$style.vuesaxlinearsearchNormal2">
        <img
          :class="$style.vuesaxlinearsearchNormalIcon"
          loading="lazy"
          alt=""
          src="/vuesaxlinearsearchnormal.svg"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import NavigationSide from "../components/NavigationSide.vue";
  import TopNav from "../components/TopNav.vue";
  import OrderCardRow from "../components/OrderCardRow.vue";
  import Button from "../components/Button.vue";
  import WeeklyPerformance from "../components/WeeklyPerformance.vue";
  import FinancialData from "../components/FinancialData.vue";
  import EntitiesList from "../components/EntitiesList.vue";

  export default defineComponent({
    name: "Dashboard",
    components: {
      NavigationSide,
      TopNav,
      OrderCardRow,
      Button,
      WeeklyPerformance,
      FinancialData,
      EntitiesList,
    },
  });
</script>
<style module>
  .imageProcessing201910249087 {
    height: 1087.5px;
    width: 1450px;
    position: relative;
    display: none;
    max-width: 100%;
  }
  .div {
    height: 1080px;
    width: 1440px;
    position: relative;
    display: none;
    max-width: 100%;
  }
  .dashboardChild {
    height: 123.7px;
    width: 245px;
    position: relative;
    display: none;
  }
  .orders {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: none;
    mix-blend-mode: normal;
    min-width: 52px;
  }
  .frameChild {
    width: 296px;
    height: 134px;
    position: relative;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: none;
  }
  .totalRevenue {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 106px;
    z-index: 1;
  }
  .aed {
    font-weight: 600;
  }
  .b {
    font-size: var(--font-size-17xl);
  }
  .aed1524523 {
    position: relative;
    line-height: 120%;
    mix-blend-mode: normal;
    white-space: nowrap;
    z-index: 1;
    font-size: var(--heading-h3-size);
  }
  .currentMonth {
    position: relative;
    font-size: var(--body-2-14px-semibold-size);
    line-height: 20px;
    color: var(--neutrals-neutral-50);
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 95px;
    z-index: 1;
  }
  .ordersParent {
    flex: 0.8919;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl) var(--padding-base) var(--padding-base);
    box-sizing: border-box;
    gap: var(--gap-7xs);
    min-width: 222px;
    z-index: 1;
  }
  .metricCardRows {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
  }
  .frameItem {
    height: 134px;
    width: 296px;
    position: relative;
    border-radius: var(--br-base);
    background-color: var(--white);
    display: none;
    z-index: 1;
  }
  .appointments {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 107px;
    z-index: 1;
  }
  .thisWeek {
    position: relative;
    font-size: var(--caption-1-12px-regular-size);
    line-height: 120%;
    font-weight: 600;
    color: var(--neutrals-neutral-60);
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 55px;
    z-index: 1;
  }
  .appointmentsCard {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-xl) 0px 0px;
    gap: var(--gap-9xs);
  }
  .totalRevenueLabel {
    flex: 1;
    position: relative;
    line-height: 29px;
    mix-blend-mode: normal;
    z-index: 1;
  }
  .totalRevenueRow {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-xs);
  }
  .total {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 28px;
    z-index: 1;
  }
  .active {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 34px;
    z-index: 1;
  }
  .activeRevenueLabels {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--gap-xl);
  }
  .activeRevenueRow {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0px var(--padding-4xl) 0px var(--padding-7xl);
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--primary-purple);
  }
  .revenueBreakdown {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: var(--gap-9xs);
    text-align: center;
    font-size: var(--heading-h1-size);
  }
  .appointmentsCardParent {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-3xs);
  }
  .weekly {
    align-self: stretch;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 48px;
  }
  .currentMonthAEDRow {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-12xs) 0px 0px;
  }
  .vuesaxboldarrowDownIcon {
    height: 16px;
    width: 16px;
    position: relative;
    min-height: 16px;
  }
  .currentMonthAEDContainer {
    flex: 1;
    border-radius: var(--br-5xs);
    background-color: var(--bg);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs);
    gap: var(--gap-5xs);
    z-index: 1;
  }
  .aEDContainer {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0px var(--padding-5xs) 0px 0px;
  }
  .pendingRevenueLabel {
    align-self: stretch;
    position: relative;
    line-height: 29px;
    mix-blend-mode: normal;
    z-index: 1;
  }
  .pending {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 46px;
    z-index: 1;
  }
  .pendingRevenueContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-mid);
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--primary-purple);
  }
  .pendingRevenueRow {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px 0px 0px var(--padding-base);
    gap: var(--gap-9xs);
    text-align: center;
    font-size: var(--heading-h1-size);
  }
  .aEDContainerParent {
    width: 96px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: var(--gap-lgi);
    margin-left: -4px;
    font-size: var(--caption-1-12px-regular-size);
  }
  .rectangleParent {
    flex: 0.8919;
    border-radius: var(--br-base);
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    padding: var(--padding-xl) var(--padding-base) var(--padding-base);
    box-sizing: border-box;
    min-width: 192px;
  }
  .sat {
    width: 48px;
    position: absolute;
    margin: 0 !important;
    right: 42px;
    bottom: 24px;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
  }
  .frameInner {
    align-self: stretch;
    height: 215.5px;
    position: relative;
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    z-index: 1;
  }
  .lineDiv {
    align-self: stretch;
    flex: 1;
    position: relative;
    border-top: 1px solid var(--neutrals-neutral-10);
    box-sizing: border-box;
    max-width: 100%;
  }
  .lineWrapper {
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px 0px var(--padding-231xl);
    box-sizing: border-box;
    max-width: 100%;
    margin-top: -215px;
  }
  .lineContainer {
    align-self: stretch;
    height: 251px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px 0px var(--padding-231xl);
    box-sizing: border-box;
    max-width: 100%;
    margin-top: -215px;
  }
  .frameChild6 {
    align-self: stretch;
    height: 1px;
    position: relative;
    border-top: 1px solid var(--neutrals-neutral-10);
    box-sizing: border-box;
    margin-top: -215px;
  }
  .vectorParent {
    width: 516px;
    height: 217.5px;
    margin: 0 !important;
    position: absolute;
    right: 24px;
    bottom: 53px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0px 0px 0px;
    box-sizing: border-box;
    max-width: 100%;
  }
  .revenue {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 64px;
  }
  .revenueLabelContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-6xs) 0px 0px;
  }
  .monthly {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 48px;
  }
  .monthlyDropdownContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-12xs) 0px 0px;
  }
  .monthlyLabelContainer {
    border-radius: var(--br-5xs);
    background-color: var(--bg);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs);
    gap: var(--gap-5xs);
    font-size: var(--caption-1-12px-regular-size);
  }
  .chartLabels {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--gap-xl);
    text-align: left;
    font-size: var(--heading-h5-size);
    color: var(--neutrals-neutral-100);
  }
  .k {
    width: 28px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
  }
  .bar {
    align-self: stretch;
    position: relative;
    line-height: 120%;
    font-weight: 600;
  }
  .weeklyBars {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-5xl);
  }
  .bars {
    width: 28px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 21.5px 0px 0px;
    box-sizing: border-box;
  }
  .unionIcon {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: var(--br-9xs);
    width: 100%;
    height: 100%;
    z-index: 5;
  }
  .span {
    font-size: var(--caption-1-12px-regular-size);
  }
  .aed4209152 {
    position: absolute;
    top: 8px;
    left: 12px;
    line-height: 17px;
    font-weight: 600;
    display: inline-block;
    width: 93px;
    min-width: 93px;
    white-space: nowrap;
    z-index: 6;
  }
  .revenueScale {
    height: 41.3px;
    width: 117px;
    position: relative;
  }
  .amountScale {
    width: 337px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    max-width: 100%;
  }
  .scalePointerChild {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    z-index: 2;
  }
  .pointerCircle {
    position: absolute;
    top: 116.5px;
    left: 190px;
    background: linear-gradient(180deg, #97affc, rgba(151, 175, 252, 0));
    width: 12px;
    height: 91px;
    z-index: 3;
  }
  .pointerDot {
    position: absolute;
    top: 109.5px;
    left: 189px;
    border-radius: 50%;
    background-color: #5229e9;
    border: 0px solid var(--white);
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    z-index: 4;
  }
  .scalePointer {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0 !important;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
  .sun {
    width: 48px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    flex-shrink: 0;
  }
  .weekdays {
    width: 408px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 100%;
    gap: var(--gap-xl);
    text-align: center;
    font-size: var(--button-very-small-size);
    color: var(--neutrals-neutral-50);
  }
  .chartScale1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 58.5px 28px var(--padding-11xs-5);
    box-sizing: border-box;
    position: relative;
    gap: 125.7px;
    min-width: 309px;
    max-width: 100%;
    text-align: left;
    font-size: var(--body-2-14px-semibold-size);
    color: var(--neutrals-neutral-100);
  }
  .chartBarsContainer {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-7xs);
    max-width: 100%;
  }
  .chartScale {
    width: 510px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2.5px;
    max-width: 100%;
    text-align: right;
  }
  .chartContainer {
    align-self: stretch;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl) var(--padding-5xl) 22.5px;
    box-sizing: border-box;
    position: relative;
    gap: 18px;
    max-width: 100%;
    text-align: center;
    font-size: var(--button-very-small-size);
    color: var(--neutrals-neutral-50);
  }
  .verticals {
    flex: 1;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 51px;
    max-width: 100%;
  }
  .vuesaxlinearsearchNormalIcon {
    height: 20px;
    width: 20px;
    position: relative;
  }
  .vuesaxlinearsearchNormal {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .searchFilterIcon {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-11xs);
  }
  .searchFilterIcons {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-5xs);
  }
  .filterInput {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    max-width: 100%;
    row-gap: 20px;
  }
  .illustrationhomeRepairMai {
    height: 34.3px;
    width: 34.3px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  }
  .cardImage {
    width: 48px;
    border-radius: 13.71px;
    background-color: var(--bg);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-6xs-9) var(--padding-7xs);
    box-sizing: border-box;
  }
  .eventManagement {
    width: 201px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
  }
  .cardTitle {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-mini) var(--padding-xl) 0px 0px;
    box-sizing: border-box;
    min-width: 252px;
    max-width: 100%;
  }
  .performanceBar {
    align-self: stretch;
    position: relative;
    line-height: 29px;
  }
  .monthLabel {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 36px;
  }
  .lastMonth {
    position: relative;
    font-size: var(--button-very-small-size);
    line-height: 120%;
    color: var(--neutrals-neutral-50);
    display: inline-block;
    min-width: 53px;
  }
  .lastMonthLabel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-9xs);
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--alert-green-50);
  }
  .cardBars {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-11xs);
  }
  .cardPerformance {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
  }
  .cardFooter {
    width: 93px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-11xs) 0px 0px;
    box-sizing: border-box;
    text-align: right;
    font-size: var(--heading-h1-size);
    color: var(--primary-purple);
  }
  .cardservicesvertical {
    align-self: stretch;
    border-radius: var(--br-5xs);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
    max-width: 100%;
  }
  .businessSetup {
    width: 278px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
  }
  .serviceCards {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-xs);
    max-width: 100%;
  }
  .viewMoreButtonChild {
    height: 99px;
    width: 608px;
    position: relative;
    display: none;
    max-width: 100%;
  }
  .viewMoreButton {
    width: 100%;
    margin: 0 !important;
    position: absolute;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: linear-gradient(0deg, #fff 21.99%, rgba(255, 255, 255, 0));
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 30px var(--padding-5xl) 29px;
    box-sizing: border-box;
    max-width: 100%;
    z-index: 1;
  }
  .serviceFilters {
    align-self: stretch;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl) var(--padding-5xl) 64px;
    box-sizing: border-box;
    position: relative;
    gap: var(--gap-5xl);
    max-width: 100%;
  }
  .metricCardContainer {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
    max-width: 100%;
  }
  .graphShowingVendor {
    position: relative;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
  }
  .vendorGrowthGraph {
    align-self: stretch;
    background-color: var(--color-gainsboro-100);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: var(--padding-5xl) var(--padding-xl);
    color: var(--color-black);
    font-family: var(--text-sm-font-medium);
  }
  .metricCards {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-5xl);
    min-width: 395px;
    max-width: 100%;
  }
  .rectangleDiv {
    height: 284px;
    width: 296px;
    position: relative;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: none;
  }
  .noOfVendors {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 111px;
    z-index: 1;
  }
  .paidStatus {
    position: relative;
    line-height: 120%;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 88px;
    z-index: 1;
  }
  .subscriptionStatus {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px 0px 29.5px;
    gap: var(--gap-9xs);
    font-size: var(--font-size-17xl);
  }
  .chartElementsChild {
    width: 12px;
    height: 8px;
    position: relative;
    border-radius: var(--br-mini);
    background-color: var(--primary-purple);
    z-index: 1;
  }
  .chartElementsItem {
    width: 12px;
    height: 8px;
    position: relative;
    border-radius: var(--br-mini);
    background-color: #bab7fb;
    z-index: 1;
  }
  .chartElementsInner {
    width: 12px;
    height: 8px;
    position: relative;
    border-radius: var(--br-mini);
    background-color: #e8e7fe;
    z-index: 1;
  }
  .chartElements {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 21px;
  }
  .chartBars {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-8xs-5) var(--padding-8xs) 0px 0px;
  }
  .earlyAccessPercentage {
    position: relative;
    line-height: 17px;
    font-weight: 600;
    display: inline-block;
    min-width: 29px;
    z-index: 1;
  }
  .activeSubscriptionPercentage {
    position: relative;
    line-height: 17px;
    font-weight: 600;
    display: inline-block;
    min-width: 30px;
    z-index: 1;
  }
  .subscriptionPercentages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-xs);
  }
  .earlyAccess {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 68px;
    z-index: 1;
  }
  .activeSubs {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 62px;
    z-index: 1;
  }
  .activeSubscriptionLabel {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-8xs) 0px var(--padding-12xs);
  }
  .inactive {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 44px;
    z-index: 1;
  }
  .inactiveSubscriptionLabel {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-12xs);
  }
  .subscriptionLabel {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-mini);
  }
  .subscriptionLabels {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-11xs-5) 0px 0px;
    font-size: var(--caption-1-12px-regular-size);
  }
  .subscriptionChart {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 3px;
    font-size: var(--body-2-14px-semibold-size);
  }
  .subscriptionFund {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
  }
  .rectangleGroup {
    align-self: stretch;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl) var(--padding-5xl) var(--padding-base);
    gap: var(--gap-4xs);
  }
  .cardBorderChild {
    align-self: stretch;
    height: 413px;
    position: relative;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: none;
  }
  .topOraganizations {
    align-self: stretch;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    z-index: 1;
  }
  .organizationsHeader {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-10xs-5) 0px 0px;
  }
  .appointment {
    margin: 0;
  }
  .appointmentLook {
    width: 83px;
    position: relative;
    font-size: var(--button-very-small-size);
    line-height: 120%;
    font-weight: 600;
    color: var(--neutrals-neutral-70);
    text-align: right;
    display: inline-block;
    flex-shrink: 0;
    z-index: 1;
  }
  .entitiesHeader {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .entities {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-5xl);
  }
  .vuesaxlinearsearchNormalWrapper {
    display: none;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-11xs);
  }
  .cardBorder {
    align-self: stretch;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl) 0px 0px;
    gap: var(--gap-base);
  }
  .subscriptionFundPanels {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
  }
  .extraContent {
    align-self: stretch;
    background-color: var(--color-gainsboro-100);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl) 66px;
    white-space: nowrap;
    color: var(--color-black);
    font-family: var(--text-sm-font-medium);
  }
  .subscriptionsFunds {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-4xl);
    min-width: 192px;
  }
  .subscriptions {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 101px;
    z-index: 1;
  }
  .current {
    position: relative;
    line-height: 120%;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 86px;
    z-index: 1;
  }
  .subscriptionPeriod {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-9xs);
    font-size: var(--font-size-17xl);
  }
  .subscriptionsParent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
  }
  .paidBarChild {
    width: 12px;
    height: 8px;
    position: relative;
    border-radius: var(--br-mini);
    background-color: var(--alert-blue-100);
    z-index: 1;
  }
  .paidBar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-8xs-5) var(--padding-5xs) 0px 0px;
  }
  .paidPercentage {
    flex: 1;
    position: relative;
    line-height: 17px;
    font-weight: 600;
    display: inline-block;
    min-width: 30px;
    z-index: 1;
  }
  .paid {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 25px;
    z-index: 1;
  }
  .paidBarParent {
    width: 83px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-9xs);
  }
  .trailElementsChild {
    width: 12px;
    height: 8px;
    position: relative;
    border-radius: var(--br-mini);
    background-color: var(--color-lightskyblue);
    z-index: 1;
  }
  .trail {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 24px;
    z-index: 1;
  }
  .trailBar {
    width: 82px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-9xs);
  }
  .cancelPercentage {
    position: relative;
    line-height: 17px;
    font-weight: 600;
    display: inline-block;
    min-width: 28px;
    z-index: 1;
  }
  .cancel {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 39px;
    z-index: 1;
  }
  .cancelLabel {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-11xs-5) 0px 0px;
    font-size: var(--caption-1-12px-regular-size);
  }
  .cancelStatus {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-9xs);
  }
  .frameParent1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-xs);
    font-size: var(--body-2-14px-semibold-size);
  }
  .frameGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 45.5px;
  }
  .rectangleContainer {
    align-self: stretch;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl) var(--padding-5xl) var(--padding-base);
    gap: 29px;
  }
  .topVendors {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 93px;
  }
  .topVendorsWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-10xs-5) 0px 0px;
  }
  .ordersCompleted {
    height: 24px;
    width: 80px;
    position: relative;
    font-size: var(--button-very-small-size);
    line-height: 120%;
    font-weight: 600;
    color: var(--neutrals-neutral-70);
    text-align: right;
    display: inline-block;
    flex-shrink: 0;
  }
  .frameParent2 {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--gap-xl);
    z-index: 1;
  }
  .cardBorderInner {
    width: 283px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0px 11px;
    box-sizing: border-box;
  }
  .cardBorder1 {
    align-self: stretch;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    padding: var(--padding-5xl) 0px 0px;
    gap: var(--gap-base);
  }
  .upcomingEventsWrapper {
    align-self: stretch;
    background-color: var(--color-gainsboro-100);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: var(--padding-5xl) var(--padding-xl);
    white-space: nowrap;
    color: var(--color-black);
    font-family: var(--text-sm-font-medium);
  }
  .financialSummary {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
    min-width: 395px;
    max-width: 100%;
  }
  .contentMetrics {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: var(--gap-base);
    max-width: 100%;
  }
  .pageHeader {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-13xl);
    max-width: 100%;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-21xl) 0px 0px;
    box-sizing: border-box;
    max-width: calc(100% - 160px);
    text-align: left;
    font-size: var(--heading-h5-size);
    color: var(--neutrals-neutral-100);
    font-family: var(--heading-h3);
  }
  .navigationSideParent {
    width: 1392px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 48px;
    flex-shrink: 0;
    max-width: calc(100% - 246px);
  }
  .vuesaxlinearsearchNormal2 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
  }
  .searchContainer {
    height: 229px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .dashboard {
    width: 100%;
    position: relative;
    background-color: var(--bg);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0px 0px 52px;
    box-sizing: border-box;
    gap: 226px;
    line-height: normal;
    letter-spacing: normal;
  }

  @media screen and (max-width: 1200px) {
    .dashboard {
      gap: 113px;
    }
  }
</style>
