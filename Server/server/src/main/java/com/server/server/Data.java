package com.server.server;
import java.util.List;
public class Data {
    public static class table{
        private FormInline formInline;
        private List<TableData> tableData;
    
        // Getters and Setters
        public  FormInline getFormInline() {
            return formInline;
        }
    
        public void setFormInline(FormInline formInline) {
            this.formInline = formInline;
        }
    
        public List<TableData> getTableData() {
            return tableData;
        }
    
        public void setTableData(List<TableData> tableData) {
            this.tableData = tableData;
        }
    
        // 内部类：FormInline
        public static class FormInline {
            private String user;
            private String region;
    
            // Getters and Setters
            public String getUser() {
                return user;
            }
    
            public void setUser(String user) {
                this.user = user;
            }
    
            public String getRegion() {
                return region;
            }
    
            public void setRegion(String region) {
                this.region = region;
            }
        }
    
        // 内部类：TableData
        public static class TableData {
            private String date;
            private String name;
            private String address;
    
            // Getters and Setters
            public String getDate() {
                return date;
            }
    
            public void setDate(String date) {
                this.date = date;
            }
    
            public String getName() {
                return name;
            }
    
            public void setName(String name) {
                this.name = name;
            }
    
            public String getAddress() {
                return address;
            }
    
            public void setAddress(String address) {
                this.address = address;
            }
        }
    }
    public static class Address{
        private String province;
        private String city;
        public String getProvince() {
            return province;
        }

        public void setProvince(String province) {
            this.province = province;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }
    }

    public static class User {
        private String name;
        private Integer age;
        private Address address;

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getAge() {
            return age;
        }

        public void setAge(Integer age) {
            this.age = age;
        }

        public Address getAddress() {
            return address;
        }

        public void setAddress(Address address) {
            this.address = address;
        }
    }
}
