export const biStreamingService = `
<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" xmlns:tns="http://tempuri.org/" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsx="http://schemas.xmlsoap.org/ws/2004/09/mex" xmlns:wsap="http://schemas.xmlsoap.org/ws/2004/08/addressing/policy" xmlns:wsaw="http://www.w3.org/2006/05/addressing/wsdl" xmlns:msc="http://schemas.microsoft.com/ws/2005/12/wsdl/contract" xmlns:i0="http://www.ultipro.com/dataservices/bistream/2" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsa10="http://www.w3.org/2005/08/addressing" xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata" name="BIStreamService" targetNamespace="http://tempuri.org/">
<wsp:Policy wsu:Id="WSHttpBinding_IBIStreamService_policy">
<wsp:ExactlyOne>
<wsp:All>
<wsaw:UsingAddressing/>
</wsp:All>
</wsp:ExactlyOne>
</wsp:Policy>
<wsdl:import namespace="http://www.ultipro.com/dataservices/bistream/2" location="https://servicet.ultipro.com/services/BIStreamingService?wsdl=wsdl0"/>
<wsdl:types/>
<wsdl:binding name="WSHttpBinding_IBIStreamService" type="i0:IBIStreamService">
<wsp:PolicyReference URI="#WSHttpBinding_IBIStreamService_policy"/>
<soap12:binding transport="http://schemas.xmlsoap.org/soap/http"/>
<wsdl:operation name="RetrieveReport">
<soap12:operation soapAction="http://www.ultipro.com/dataservices/bistream/2/IBIStreamService/RetrieveReport" style="document"/>
<wsdl:input name="RetrieveReportRequest">
<soap12:header message="i0:RetrieveReportRequest_Headers" part="ReportKey" use="literal"/>
<soap12:body use="literal"/>
</wsdl:input>
<wsdl:output name="StreamReportResponse">
<soap12:header message="i0:StreamReportResponse_Headers" part="Status" use="literal"/>
<soap12:header message="i0:StreamReportResponse_Headers" part="StatusMessage" use="literal"/>
<soap12:body use="literal"/>
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:binding name="BasicHttpBinding_IBIStreamService" type="i0:IBIStreamService">
<soap:binding transport="http://schemas.xmlsoap.org/soap/http"/>
<wsdl:operation name="RetrieveReport">
<soap:operation soapAction="http://www.ultipro.com/dataservices/bistream/2/IBIStreamService/RetrieveReport" style="document"/>
<wsdl:input name="RetrieveReportRequest">
<soap:header message="i0:RetrieveReportRequest_Headers" part="ReportKey" use="literal"/>
<soap:body use="literal"/>
</wsdl:input>
<wsdl:output name="StreamReportResponse">
<soap:header message="i0:StreamReportResponse_Headers" part="Status" use="literal"/>
<soap:header message="i0:StreamReportResponse_Headers" part="StatusMessage" use="literal"/>
<soap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:service name="BIStreamService">
<wsdl:port name="WSHttpBinding_IBIStreamService" binding="tns:WSHttpBinding_IBIStreamService">
<soap12:address location="https://servicet.ultipro.com/services/BIStreamingService"/>
<wsa10:EndpointReference>
<wsa10:Address>https://servicet.ultipro.com/services/BIStreamingService</wsa10:Address>
</wsa10:EndpointReference>
</wsdl:port>
<wsdl:port name="BasicHttpBinding_IBIStreamService" binding="tns:BasicHttpBinding_IBIStreamService">
<soap:address location="https://servicet.ultipro.com/services/BIStreamingService"/>
</wsdl:port>
</wsdl:service>
</wsdl:definitions>`

export const biStreamingServiceWsdl = `
<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" xmlns:tns="http://www.ultipro.com/dataservices/bistream/2" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsx="http://schemas.xmlsoap.org/ws/2004/09/mex" xmlns:wsap="http://schemas.xmlsoap.org/ws/2004/08/addressing/policy" xmlns:wsaw="http://www.w3.org/2006/05/addressing/wsdl" xmlns:msc="http://schemas.microsoft.com/ws/2005/12/wsdl/contract" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsa10="http://www.w3.org/2005/08/addressing" xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata" targetNamespace="http://www.ultipro.com/dataservices/bistream/2">
<wsdl:types>
<xsd:schema targetNamespace="http://www.ultipro.com/dataservices/bistream/2/Imports">
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIStreamingService?xsd=xsd0" namespace="http://www.ultipro.com/dataservices/bistream/2"/>
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIStreamingService?xsd=xsd1" namespace="http://schemas.microsoft.com/2003/10/Serialization/"/>
<xsd:import schemaLocation="https://servicet.ultipro.com/services/BIStreamingService?xsd=xsd2" namespace="http://schemas.microsoft.com/Message"/>
</xsd:schema>
</wsdl:types>
<wsdl:message name="RetrieveReportRequest">
<wsdl:part name="parameters" element="tns:RetrieveReportRequest"/>
</wsdl:message>
<wsdl:message name="RetrieveReportRequest_Headers">
<wsdl:part name="ReportKey" element="tns:ReportKey"/>
</wsdl:message>
<wsdl:message name="StreamReportResponse">
<wsdl:part name="parameters" element="tns:StreamReportResponse"/>
</wsdl:message>
<wsdl:message name="StreamReportResponse_Headers">
<wsdl:part name="Status" element="tns:Status"/>
<wsdl:part name="StatusMessage" element="tns:StatusMessage"/>
</wsdl:message>
<wsdl:portType name="IBIStreamService">
<wsdl:operation name="RetrieveReport">
<wsdl:input wsaw:Action="http://www.ultipro.com/dataservices/bistream/2/IBIStreamService/RetrieveReport" name="RetrieveReportRequest" message="tns:RetrieveReportRequest"/>
<wsdl:output wsaw:Action="http://www.ultipro.com/dataservices/bistream/2/IBIStreamService/RetrieveReportResponse" name="StreamReportResponse" message="tns:StreamReportResponse"/>
</wsdl:operation>
</wsdl:portType>
</wsdl:definitions>`

export const biStreamingServiceXsd0 = `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://www.ultipro.com/dataservices/bistream/2" elementFormDefault="qualified" targetNamespace="http://www.ultipro.com/dataservices/bistream/2">
<xs:import schemaLocation="https://servicet.ultipro.com/services/BIStreamingService?xsd=xsd2" namespace="http://schemas.microsoft.com/Message"/>
<xs:element name="RetrieveReportRequest">
<xs:complexType>
<xs:sequence/>
</xs:complexType>
</xs:element>
<xs:element name="ReportKey" nillable="true" type="xs:string"/>
<xs:element name="StreamReportResponse">
<xs:complexType>
<xs:sequence>
<xs:element xmlns:q1="http://schemas.microsoft.com/Message" name="ReportStream" type="q1:StreamBody"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:simpleType name="ReportResponseStatus">
<xs:restriction base="xs:string">
<xs:enumeration value="Working"/>
<xs:enumeration value="Completed"/>
<xs:enumeration value="Failed"/>
</xs:restriction>
</xs:simpleType>
<xs:element name="ReportResponseStatus" nillable="true" type="tns:ReportResponseStatus"/>
<xs:element name="Status" type="tns:ReportResponseStatus"/>
<xs:element name="StatusMessage" nillable="true" type="xs:string"/>
</xs:schema>`

export const biStreamingServiceXsd1 = `
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
</xs:schema>`

export const biStreamingServiceXsd2 = `
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://schemas.microsoft.com/Message" elementFormDefault="qualified" targetNamespace="http://schemas.microsoft.com/Message">
<xs:simpleType name="StreamBody">
<xs:restriction base="xs:base64Binary"/>
</xs:simpleType>
</xs:schema>`