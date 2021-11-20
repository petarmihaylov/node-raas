export const biDataServiceWsdl = `
<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" xmlns:tns="http://tempuri.org/" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsx="http://schemas.xmlsoap.org/ws/2004/09/mex" xmlns:wsap="http://schemas.xmlsoap.org/ws/2004/08/addressing/policy" xmlns:wsaw="http://www.w3.org/2006/05/addressing/wsdl" xmlns:msc="http://schemas.microsoft.com/ws/2005/12/wsdl/contract" xmlns:i0="http://www.ultipro.com/dataservices/bidata/2" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsa10="http://www.w3.org/2005/08/addressing" xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata" name="BIDataService" targetNamespace="http://tempuri.org/">
<wsp:Policy wsu:Id="WSHttpBinding_IBIDataService_policy">
<wsp:ExactlyOne>
<wsp:All>
<wsaw:UsingAddressing/>
</wsp:All>
</wsp:ExactlyOne>
</wsp:Policy>
<wsdl:import namespace="http://www.ultipro.com/dataservices/bidata/2" location="https://servicet.ultipro.com/services/BIDataService?wsdl=wsdl0"/>
<wsdl:types/>
<wsdl:binding name="WSHttpBinding_IBIDataService" type="i0:IBIDataService">
<wsp:PolicyReference URI="#WSHttpBinding_IBIDataService_policy"/>
<soap12:binding transport="http://schemas.xmlsoap.org/soap/http"/>
<wsdl:operation name="Ping">
<soap12:operation soapAction="http://tempuri.org/IUesWcfService/Ping" style="document"/>
<wsdl:input>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="LogOn">
<soap12:operation soapAction="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOn" style="document"/>
<wsdl:input>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="LogOnWithToken">
<soap12:operation soapAction="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOnWithToken" style="document"/>
<wsdl:input>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="LogOff">
<soap12:operation soapAction="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOff" style="document"/>
<wsdl:input>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ExecuteReport">
<soap12:operation soapAction="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/ExecuteReport" style="document"/>
<wsdl:input>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="GetReportList">
<soap12:operation soapAction="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/GetReportList" style="document"/>
<wsdl:input>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="GetReportParameters">
<soap12:operation soapAction="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/GetReportParameters" style="document"/>
<wsdl:input>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:service name="BIDataService">
<wsdl:port name="WSHttpBinding_IBIDataService" binding="tns:WSHttpBinding_IBIDataService">
<soap12:address location="https://servicet.ultipro.com/services/BIDataService"/>
<wsa10:EndpointReference>
<wsa10:Address>https://servicet.ultipro.com/services/BIDataService</wsa10:Address>
</wsa10:EndpointReference>
</wsdl:port>
</wsdl:service>
</wsdl:definitions>`

export const biDataServiceWsdl0 = `
<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" xmlns:tns="http://www.ultipro.com/dataservices/bidata/2" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsx="http://schemas.xmlsoap.org/ws/2004/09/mex" xmlns:wsap="http://schemas.xmlsoap.org/ws/2004/08/addressing/policy" xmlns:wsaw="http://www.w3.org/2006/05/addressing/wsdl" xmlns:msc="http://schemas.microsoft.com/ws/2005/12/wsdl/contract" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsa10="http://www.w3.org/2005/08/addressing" xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata" targetNamespace="http://www.ultipro.com/dataservices/bidata/2">
<wsdl:types>
<xsd:schema targetNamespace="http://www.ultipro.com/dataservices/bidata/2/Imports">
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd0" namespace="http://tempuri.org/"/>
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd1" namespace="http://schemas.microsoft.com/2003/10/Serialization/"/>
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd2" namespace="http://schemas.datacontract.org/2004/07/UltimateSoftware.WcfTypes.Base"/>
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd3" namespace="http://schemas.datacontract.org/2004/07/System.Collections.Specialized"/>
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd4" namespace="http://www.ultipro.com/dataservices/bidata/2"/>
</xsd:schema>
</wsdl:types>
<wsdl:message name="IBIDataService_Ping_InputMessage">
<wsdl:part xmlns:q1="http://tempuri.org/" name="parameters" element="q1:Ping"/>
</wsdl:message>
<wsdl:message name="IBIDataService_Ping_OutputMessage">
<wsdl:part xmlns:q2="http://tempuri.org/" name="parameters" element="q2:PingResponse"/>
</wsdl:message>
<wsdl:message name="IBIDataService_LogOn_InputMessage">
<wsdl:part name="parameters" element="tns:LogOn"/>
</wsdl:message>
<wsdl:message name="IBIDataService_LogOn_OutputMessage">
<wsdl:part name="parameters" element="tns:LogOnResponse"/>
</wsdl:message>
<wsdl:message name="IBIDataService_LogOnWithToken_InputMessage">
<wsdl:part name="parameters" element="tns:LogOnWithToken"/>
</wsdl:message>
<wsdl:message name="IBIDataService_LogOnWithToken_OutputMessage">
<wsdl:part name="parameters" element="tns:LogOnWithTokenResponse"/>
</wsdl:message>
<wsdl:message name="IBIDataService_LogOff_InputMessage">
<wsdl:part name="parameters" element="tns:LogOff"/>
</wsdl:message>
<wsdl:message name="IBIDataService_LogOff_OutputMessage">
<wsdl:part name="parameters" element="tns:LogOffResponse"/>
</wsdl:message>
<wsdl:message name="IBIDataService_ExecuteReport_InputMessage">
<wsdl:part name="parameters" element="tns:ExecuteReport"/>
</wsdl:message>
<wsdl:message name="IBIDataService_ExecuteReport_OutputMessage">
<wsdl:part name="parameters" element="tns:ExecuteReportResponse"/>
</wsdl:message>
<wsdl:message name="IBIDataService_GetReportList_InputMessage">
<wsdl:part name="parameters" element="tns:GetReportList"/>
</wsdl:message>
<wsdl:message name="IBIDataService_GetReportList_OutputMessage">
<wsdl:part name="parameters" element="tns:GetReportListResponse"/>
</wsdl:message>
<wsdl:message name="IBIDataService_GetReportParameters_InputMessage">
<wsdl:part name="parameters" element="tns:GetReportParameters"/>
</wsdl:message>
<wsdl:message name="IBIDataService_GetReportParameters_OutputMessage">
<wsdl:part name="parameters" element="tns:GetReportParametersResponse"/>
</wsdl:message>
<wsdl:portType name="IBIDataService">
<wsdl:operation name="Ping">
<wsdl:input wsaw:Action="http://tempuri.org/IUesWcfService/Ping" message="tns:IBIDataService_Ping_InputMessage"/>
<wsdl:output wsaw:Action="http://tempuri.org/IUesWcfService/PingResponse" message="tns:IBIDataService_Ping_OutputMessage"/>
</wsdl:operation>
<wsdl:operation name="LogOn">
<wsdl:input wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOn" message="tns:IBIDataService_LogOn_InputMessage"/>
<wsdl:output wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOnResponse" message="tns:IBIDataService_LogOn_OutputMessage"/>
</wsdl:operation>
<wsdl:operation name="LogOnWithToken">
<wsdl:input wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOnWithToken" message="tns:IBIDataService_LogOnWithToken_InputMessage"/>
<wsdl:output wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOnWithTokenResponse" message="tns:IBIDataService_LogOnWithToken_OutputMessage"/>
</wsdl:operation>
<wsdl:operation name="LogOff">
<wsdl:input wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOff" message="tns:IBIDataService_LogOff_InputMessage"/>
<wsdl:output wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/LogOffResponse" message="tns:IBIDataService_LogOff_OutputMessage"/>
</wsdl:operation>
<wsdl:operation name="ExecuteReport">
<wsdl:input wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/ExecuteReport" message="tns:IBIDataService_ExecuteReport_InputMessage"/>
<wsdl:output wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/ExecuteReportResponse" message="tns:IBIDataService_ExecuteReport_OutputMessage"/>
</wsdl:operation>
<wsdl:operation name="GetReportList">
<wsdl:input wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/GetReportList" message="tns:IBIDataService_GetReportList_InputMessage"/>
<wsdl:output wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/GetReportListResponse" message="tns:IBIDataService_GetReportList_OutputMessage"/>
</wsdl:operation>
<wsdl:operation name="GetReportParameters">
<wsdl:input wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/GetReportParameters" message="tns:IBIDataService_GetReportParameters_InputMessage"/>
<wsdl:output wsaw:Action="http://www.ultipro.com/dataservices/bidata/2/IBIDataService/GetReportParametersResponse" message="tns:IBIDataService_GetReportParameters_OutputMessage"/>
</wsdl:operation>
</wsdl:portType>
</wsdl:definitions>`


export const biDataServiceXsd0 = `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://tempuri.org/" elementFormDefault="qualified" targetNamespace="http://tempuri.org/">
<xs:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd2" namespace="http://schemas.datacontract.org/2004/07/UltimateSoftware.WcfTypes.Base"/>
<xs:element name="Ping">
<xs:complexType>
<xs:sequence/>
</xs:complexType>
</xs:element>
<xs:element name="PingResponse">
<xs:complexType>
<xs:sequence>
<xs:element xmlns:q1="http://schemas.datacontract.org/2004/07/UltimateSoftware.WcfTypes.Base" minOccurs="0" name="PingResult" nillable="true" type="q1:PingResponse"/>
</xs:sequence>
</xs:complexType>
</xs:element>
</xs:schema>
`

export const biDataServiceXsd1 = `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://schemas.microsoft.com/2003/10/Serialization/" attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="http://schemas.microsoft.com/2003/10/Serialization/">
<xs:element name="anyType" nillable="true" type="xs:anyType"/>
<xs:element name="anyURI" nillable="true" type="xs:anyURI"/>
<xs:element name="base64Binary" nillable="true" type="xs:base64Binary"/>
<xs:element name="boolean" nillable="true" type="xs:boolean"/>
<xs:element name="byte" nillable="true" type="xs:byte"/>
<xs:element name="dateTime" nillable="true" type="xs:dateTime"/>
<xs:element name="decimal" nillable="true" type="xs:decimal"/>
<xs:element name="double" nillable="true" type="xs:double"/>
<xs:element name="float" nillable="true" type="xs:float"/>
<xs:element name="int" nillable="true" type="xs:int"/>
<xs:element name="long" nillable="true" type="xs:long"/>
<xs:element name="QName" nillable="true" type="xs:QName"/>
<xs:element name="short" nillable="true" type="xs:short"/>
<xs:element name="string" nillable="true" type="xs:string"/>
<xs:element name="unsignedByte" nillable="true" type="xs:unsignedByte"/>
<xs:element name="unsignedInt" nillable="true" type="xs:unsignedInt"/>
<xs:element name="unsignedLong" nillable="true" type="xs:unsignedLong"/>
<xs:element name="unsignedShort" nillable="true" type="xs:unsignedShort"/>
<xs:element name="char" nillable="true" type="tns:char"/>
<xs:simpleType name="char">
<xs:restriction base="xs:int"/>
</xs:simpleType>
<xs:element name="duration" nillable="true" type="tns:duration"/>
<xs:simpleType name="duration">
<xs:restriction base="xs:duration">
<xs:pattern value="\-?P(\d*D)?(T(\d*H)?(\d*M)?(\d*(\.\d*)?S)?)?"/>
<xs:minInclusive value="-P10675199DT2H48M5.4775808S"/>
<xs:maxInclusive value="P10675199DT2H48M5.4775807S"/>
</xs:restriction>
</xs:simpleType>
<xs:element name="guid" nillable="true" type="tns:guid"/>
<xs:simpleType name="guid">
<xs:restriction base="xs:string">
<xs:pattern value="[\da-fA-F]{8}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{12}"/>
</xs:restriction>
</xs:simpleType>
<xs:attribute name="FactoryType" type="xs:QName"/>
<xs:attribute name="Id" type="xs:ID"/>
<xs:attribute name="Ref" type="xs:IDREF"/>
</xs:schema>
`

export const biDataServiceXsd2 = `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://schemas.datacontract.org/2004/07/UltimateSoftware.WcfTypes.Base" elementFormDefault="qualified" targetNamespace="http://schemas.datacontract.org/2004/07/UltimateSoftware.WcfTypes.Base">
<xs:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd3" namespace="http://schemas.datacontract.org/2004/07/System.Collections.Specialized"/>
<xs:complexType name="PingResponse">
<xs:sequence>
<xs:element minOccurs="0" name="AppDomainName" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="CallerIPAddress" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="Child" nillable="true" type="tns:PingResponse"/>
<xs:element minOccurs="0" name="ExceptionDetails" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="ExceptionMessage" nillable="true" type="xs:string"/>
<xs:element xmlns:q1="http://schemas.datacontract.org/2004/07/System.Collections.Specialized" minOccurs="0" name="Information" nillable="true" type="q1:NameValueCollection"/>
<xs:element minOccurs="0" name="ListenerUri" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="MachineName" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="ProcessName" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="StackTrace" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="TargetUri" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="PingResponse" nillable="true" type="tns:PingResponse"/>
</xs:schema>
`

export const biDataServiceXsd3 = `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ser="http://schemas.microsoft.com/2003/10/Serialization/" xmlns:tns="http://schemas.datacontract.org/2004/07/System.Collections.Specialized" elementFormDefault="qualified" targetNamespace="http://schemas.datacontract.org/2004/07/System.Collections.Specialized">
<xs:import schemaLocation="https://servicet.ultipro.com/services/BIDataService?xsd=xsd1" namespace="http://schemas.microsoft.com/2003/10/Serialization/"/>
<xs:complexType name="NameValueCollection">
<xs:complexContent mixed="false">
<xs:extension base="tns:NameObjectCollectionBase"/>
</xs:complexContent>
</xs:complexType>
<xs:element name="NameValueCollection" nillable="true" type="tns:NameValueCollection"/>
<xs:complexType name="NameObjectCollectionBase">
<xs:sequence>
<xs:any minOccurs="0" maxOccurs="unbounded" namespace="##local" processContents="skip"/>
</xs:sequence>
<xs:attribute ref="ser:FactoryType"/>
</xs:complexType>
<xs:element name="NameObjectCollectionBase" nillable="true" type="tns:NameObjectCollectionBase"/>
</xs:schema>`

export const biDataServiceXsd4 = `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://www.ultipro.com/dataservices/bidata/2" elementFormDefault="qualified" targetNamespace="http://www.ultipro.com/dataservices/bidata/2">
<xs:element name="LogOn">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="logOnRequest" nillable="true" type="tns:LogOnRequest"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:complexType name="LogOnRequest">
<xs:sequence>
<xs:element minOccurs="0" name="UserName" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="Password" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="ClientAccessKey" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="UserAccessKey" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="LogOnRequest" nillable="true" type="tns:LogOnRequest"/>
<xs:element name="LogOnResponse">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="LogOnResult" nillable="true" type="tns:DataContext"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:complexType name="DataContext">
<xs:sequence>
<xs:element minOccurs="0" name="ServiceId" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="ClientAccessKey" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="Token" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="Status" type="tns:ContextStatus"/>
<xs:element minOccurs="0" name="StatusMessage" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="InstanceKey" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="DataContext" nillable="true" type="tns:DataContext"/>
<xs:simpleType name="ContextStatus">
<xs:restriction base="xs:string">
<xs:enumeration value="Ok"/>
<xs:enumeration value="Failed"/>
<xs:enumeration value="LoggedOff"/>
</xs:restriction>
</xs:simpleType>
<xs:element name="ContextStatus" nillable="true" type="tns:ContextStatus"/>
<xs:element name="LogOnWithToken">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="logOnRequest" nillable="true" type="tns:LogOnWithTokenRequest"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:complexType name="LogOnWithTokenRequest">
<xs:sequence>
<xs:element name="Token" nillable="true" type="xs:string"/>
<xs:element name="ClientAccessKey" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="LogOnWithTokenRequest" nillable="true" type="tns:LogOnWithTokenRequest"/>
<xs:element name="LogOnWithTokenResponse">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="LogOnWithTokenResult" nillable="true" type="tns:DataContext"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:element name="LogOff">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="context" nillable="true" type="tns:DataContext"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:element name="LogOffResponse">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="LogOffResult" nillable="true" type="tns:DataContext"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:element name="ExecuteReport">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="request" nillable="true" type="tns:ReportRequest"/>
<xs:element minOccurs="0" name="context" nillable="true" type="tns:DataContext"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:complexType name="ReportRequest">
<xs:sequence>
<xs:element minOccurs="0" name="ReportPath" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="ReportParameters" nillable="true" type="tns:ArrayOfReportParameter"/>
</xs:sequence>
</xs:complexType>
<xs:element name="ReportRequest" nillable="true" type="tns:ReportRequest"/>
<xs:complexType name="ArrayOfReportParameter">
<xs:sequence>
<xs:element minOccurs="0" maxOccurs="unbounded" name="ReportParameter" nillable="true" type="tns:ReportParameter"/>
</xs:sequence>
</xs:complexType>
<xs:element name="ArrayOfReportParameter" nillable="true" type="tns:ArrayOfReportParameter"/>
<xs:complexType name="ReportParameter">
<xs:sequence>
<xs:element minOccurs="0" name="Name" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="Value" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="Required" type="xs:boolean"/>
<xs:element minOccurs="0" name="DataType" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="MultiValued" type="xs:boolean"/>
</xs:sequence>
</xs:complexType>
<xs:element name="ReportParameter" nillable="true" type="tns:ReportParameter"/>
<xs:element name="ExecuteReportResponse">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="ExecuteReportResult" nillable="true" type="tns:ReportResponse"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:complexType name="ReportResponse">
<xs:sequence>
<xs:element minOccurs="0" name="ReportKey" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="ReportRetrievalUri" nillable="true" type="xs:anyURI"/>
<xs:element minOccurs="0" name="Status" type="tns:ReportRequestStatus"/>
<xs:element minOccurs="0" name="StatusMessage" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="ReportResponse" nillable="true" type="tns:ReportResponse"/>
<xs:simpleType name="ReportRequestStatus">
<xs:restriction base="xs:string">
<xs:enumeration value="Success"/>
<xs:enumeration value="Failed"/>
</xs:restriction>
</xs:simpleType>
<xs:element name="ReportRequestStatus" nillable="true" type="tns:ReportRequestStatus"/>
<xs:element name="GetReportList">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="context" nillable="true" type="tns:DataContext"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:element name="GetReportListResponse">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="GetReportListResult" nillable="true" type="tns:ReportListResponse"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:complexType name="ReportListResponse">
<xs:sequence>
<xs:element name="Reports" nillable="true" type="tns:ArrayOfReport"/>
<xs:element name="Status" type="tns:ReportRequestStatus"/>
<xs:element minOccurs="0" name="StatusMessage" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="ReportListResponse" nillable="true" type="tns:ReportListResponse"/>
<xs:complexType name="ArrayOfReport">
<xs:sequence>
<xs:element minOccurs="0" maxOccurs="unbounded" name="Report" nillable="true" type="tns:Report"/>
</xs:sequence>
</xs:complexType>
<xs:element name="ArrayOfReport" nillable="true" type="tns:ArrayOfReport"/>
<xs:complexType name="Report">
<xs:sequence>
<xs:element minOccurs="0" name="ReportName" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="ReportPath" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="Report" nillable="true" type="tns:Report"/>
<xs:element name="GetReportParameters">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="reportPath" nillable="true" type="xs:string"/>
<xs:element minOccurs="0" name="context" nillable="true" type="tns:DataContext"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:element name="GetReportParametersResponse">
<xs:complexType>
<xs:sequence>
<xs:element minOccurs="0" name="GetReportParametersResult" nillable="true" type="tns:ReportParameterResponse"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:complexType name="ReportParameterResponse">
<xs:sequence>
<xs:element name="ReportParameters" nillable="true" type="tns:ArrayOfReportParameter"/>
<xs:element name="Status" type="tns:ReportRequestStatus"/>
<xs:element minOccurs="0" name="StatusMessage" nillable="true" type="xs:string"/>
</xs:sequence>
</xs:complexType>
<xs:element name="ReportParameterResponse" nillable="true" type="tns:ReportParameterResponse"/>
</xs:schema>`