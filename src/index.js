'use strict';

class User {

    constructor(name, surname, bYear) {
        this.name = name;
        this.surname = surname;
        this.bYear = bYear;
    }

    static getCurrentYear() {
        return new Date().getFullYear();
    }

    get age() {
        return User.getCurrentYear() - this.bYear;
    }

    get fullName() {
        return this.name + ' ' + this.surname;
    }
}

const Student = class extends User { //eslint-disable-line

    constructor(name, surname, bYear) {
        super(name, surname, bYear);

        this.raiting = [];
        this.raiting.length = 30;

        this.visit = [];
        this.visit.length = 30;
    }

    static findIndex(item) {
        return item.findIndex(index => typeof index === 'undefined');
    }

    mark(mark) {
        const index = Student.findIndex(this.raiting);
        this.raiting[index] = mark;
    }

    get present() {
        const index = Student.findIndex(this.visit);
        return this.visit[index] = true;
    }

    get absent() {
        const index = Student.findIndex(this.visit);
        return this.visit[index] = false;
    }

    get getAverageAttendance() {

        let index = 0,
            visit = 0;
        this.visit.forEach(attendance => {
            if (attendance === true) {
                visit++;
                index++;
            } else if (attendance === false) {
                index++;
            }
        });
        return visit / index;
    }

    get getAverageRaiting() {
        let index = 0,
            value = 0;
        this.raiting.forEach(mark => {
            if (mark) {
                value += mark;
                index++;
            }
        });
        return value / index;
    }
};


const Teacher = class extends User { //eslint-disable-line

    constructor(name, surname, bYear) {
        super(name, surname, bYear);
        this.groups = [];
        this.activeGroups = [];
    }

    addNewGroup(nameGroup) {
        this.groups.push({
            name: nameGroup,
            status: true,
        });
        this.activeGroups.push(nameGroup);
        return this.groups;
    }

    changeGroupStatus(nameGroup) {
        let changeGroup;
        const indexGroup = this.activeGroups.findIndex(i => i === nameGroup);
        this.groups.forEach(group => {
            if (group.name === nameGroup) {
                group.status = !group.status;
                changeGroup = group;
                if (group.status === false) {
                    this.activeGroups.splice(indexGroup, 1); //eslint-disable-line
                } else {
                    this.activeGroups.push(nameGroup);
                }
            }
        });
        return changeGroup;
    }
};
