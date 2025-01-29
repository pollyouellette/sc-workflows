<App>
  <Include src="./functions.rsx" />
  <Frame
    id="$main"
    enableFullBleed={false}
    isHiddenOnDesktop={false}
    isHiddenOnMobile={false}
    padding="8px 12px"
    sticky={null}
    type="main"
  >
    <Text
      id="text1"
      value="## {{ retoolContext.appName }}"
      verticalAlign="center"
    />
    <Switch id="switch1" label="Light mode">
      <Event
        event="true"
        method="trigger"
        params={{ ordered: [] }}
        pluginId="setLight"
        type="datasource"
        waitMs="0"
        waitType="debounce"
      />
      <Event
        event="false"
        method="trigger"
        params={{ ordered: [] }}
        pluginId="setDark"
        type="datasource"
        waitMs="0"
        waitType="debounce"
      />
    </Switch>
    <SplitButton
      id="splitButton1"
      _colorByIndex={["", "", "", ""]}
      _fallbackTextByIndex={["", "", "", ""]}
      _imageByIndex={["", "", "", ""]}
      _values={["", "", "", "Action 4"]}
      itemMode="static"
      overlayMaxHeight={375}
      showSelectionIndicator={true}
    >
      <Option
        id="a5cd5"
        disabled="{{table1.selectedRow.blocked}}"
        label="Block {{userFirstName.value}}"
      >
        <Event
          event="click"
          method="trigger"
          params={{ ordered: [] }}
          pluginId="blockUser"
          type="datasource"
          waitMs="0"
          waitType="debounce"
        />
      </Option>
      <Option
        id="d909f"
        disabled="{{ !table1.selectedRow.blocked }}"
        label="Unblock {{ userFirstName.value }}"
      >
        <Event
          event="click"
          method="trigger"
          params={{ ordered: [] }}
          pluginId="unblockUser"
          type="datasource"
          waitMs="0"
          waitType="debounce"
        />
      </Option>
      <Option id="71404" label="Block all users">
        <Event
          event="click"
          method="trigger"
          params={{ ordered: [] }}
          pluginId="blockAll"
          type="datasource"
          waitMs="0"
          waitType="debounce"
        />
      </Option>
      <Option
        id="95af9"
        disabled={false}
        hidden={false}
        label="Unblock all users"
      />
    </SplitButton>
    <Table
      id="table1"
      cellSelection="none"
      clearChangesetOnSave={true}
      data="{{ getUsers.data }}"
      defaultSelectedRow={{ mode: "index", indexType: "display", index: 0 }}
      emptyMessage="No rows found"
      enableSaveActions={true}
      primaryKeyColumnId="c3e73"
      showBorder={true}
      showFooter={true}
      showHeader={true}
      toolbarPosition="bottom"
    >
      <Column
        id="c3e73"
        alignment="right"
        editableOptions={{ showStepper: true }}
        format="decimal"
        formatOptions={{ showSeparators: true, notation: "standard" }}
        groupAggregationMode="sum"
        key="id"
        label="ID"
        placeholder="Enter value"
        position="center"
        size={100}
        summaryAggregationMode="none"
      />
      <Column
        id="f26ed"
        alignment="left"
        editable="true"
        format="string"
        groupAggregationMode="none"
        key="name"
        label="Name"
        placeholder="Enter value"
        position="center"
        size={100}
        summaryAggregationMode="none"
      />
      <Column
        id="14bd3"
        alignment="left"
        editable="true"
        format="string"
        formatOptions={{ showUnderline: "hover", underlineStyle: "solid" }}
        groupAggregationMode="none"
        key="email"
        label="Email"
        placeholder="Enter value"
        position="center"
        size={100}
        summaryAggregationMode="none"
      />
      <Column
        id="84fdd"
        alignment="left"
        format="boolean"
        groupAggregationMode="none"
        key="blocked"
        label="Blocked"
        placeholder="Enter value"
        position="center"
        size={100}
        summaryAggregationMode="none"
      />
      <ToolbarButton
        id="1a"
        icon="bold/interface-text-formatting-filter-2"
        label="Filter"
        type="filter"
      />
      <ToolbarButton
        id="3c"
        icon="bold/interface-download-button-2"
        label="Download"
        type="custom"
      >
        <Event
          event="clickToolbar"
          method="exportData"
          pluginId="table1"
          type="widget"
          waitMs="0"
          waitType="debounce"
        />
      </ToolbarButton>
      <ToolbarButton
        id="4d"
        icon="bold/interface-arrows-round-left"
        label="Refresh"
        type="custom"
      >
        <Event
          event="clickToolbar"
          method="refresh"
          pluginId="table1"
          type="widget"
          waitMs="0"
          waitType="debounce"
        />
      </ToolbarButton>
    </Table>
    <ListViewBeta
      id="listView1"
      _primaryKeys="{{ item.name }}"
      data="{{ getUsers.data }}"
      itemWidth="200px"
      margin="0"
      numColumns={3}
      padding="0"
    >
      <Container
        id="container1"
        footerPadding="4px 12px"
        headerPadding="4px 12px"
        padding="12px"
        showBody={true}
        showHeader={true}
      >
        <Header>
          <Text
            id="containerTitle1"
            value="#### {{ item.name }}"
            verticalAlign="center"
          />
        </Header>
        <View id="e5003" viewKey="View 1">
          <Text id="text2" value="{{ item.email }}" verticalAlign="center" />
        </View>
      </Container>
    </ListViewBeta>
    <TextInput
      id="textInput1"
      label="New User"
      labelPosition="top"
      placeholder="Enter value"
    />
    <Statistic
      id="statistic1"
      currency="USD"
      formattingStyle="currency"
      label="Gross volume"
      labelCaption="Since last month"
      positiveTrend="{{ self.value >= 0 }}"
      secondaryCurrency="USD"
      secondaryEnableTrend={true}
      secondaryFormattingStyle="percent"
      secondaryPositiveTrend="{{ self.secondaryValue >= 0 }}"
      secondaryShowSeparators={true}
      secondarySignDisplay="trendArrows"
      secondaryValue={0.08}
      showSeparators={true}
      value={7552.8}
    />
    <TagsWidget2 id="tags1" allowWrap={true} data={'["Foo", "Bar", "Baz"]'} />
  </Frame>
</App>
